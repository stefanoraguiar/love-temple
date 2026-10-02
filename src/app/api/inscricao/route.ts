import { linkPagamento } from "@/lib/evento";
import { registarInscricao } from "@/lib/inscricoes";
import {
  normalizar,
  texto,
  validarInscricao,
  type ErrosInscricao,
} from "@/lib/validacao";

export const runtime = "nodejs";

const pedidos = new Map<string, { total: number; renovaEm: number }>();

function ipDe(request: Request): string {
  const encaminhado = request.headers.get("x-forwarded-for");
  const primeiro = encaminhado?.split(",")[0]?.trim();
  return primeiro || "local";
}

function limitado(ip: string): boolean {
  const agora = Date.now();
  const slot = pedidos.get(ip);
  if (!slot || slot.renovaEm < agora) {
    pedidos.set(ip, { total: 1, renovaEm: agora + 60 * 60 * 1000 });
    return false;
  }
  slot.total += 1;
  return slot.total > 8;
}

function origemValida(request: Request): boolean {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  if (!host || !origin) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!origemValida(request)) {
    return json({ ok: false, erro: "Pedido recusado." }, 403);
  }

  const tamanho = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(tamanho) && tamanho > 20_000) {
    return json({ ok: false, erro: "Pedido demasiado grande." }, 413);
  }

  if (limitado(ipDe(request))) {
    return json(
      { ok: false, erro: "Muitas tentativas. Espera um pouco e tenta outra vez." },
      429,
    );
  }

  let bruto: unknown;
  try {
    bruto = await request.json();
  } catch {
    return json({ ok: false, erro: "Não foi possível ler o formulário." }, 400);
  }

  if (!bruto || typeof bruto !== "object" || Array.isArray(bruto)) {
    return json({ ok: false, erro: "Não foi possível ler o formulário." }, 400);
  }

  const campos = bruto as Record<string, unknown>;
  const dados = {
    nome: texto(campos.nome, 200),
    email: texto(campos.email, 200),
    telemovel: texto(campos.telemovel, 40),
    comunidade: campos.comunidade === true,
    maioridade: campos.maioridade === true,
    consentimento: campos.consentimento === true,
    empresa: texto(campos.empresa, 200),
  };

  if (dados.empresa.trim()) {
    return json({ ok: true, pagamentoUrl: linkPagamento() });
  }

  const erros: ErrosInscricao = validarInscricao(dados);
  if (Object.keys(erros).length > 0) {
    return json({ ok: false, erros }, 400);
  }

  const limpo = normalizar(dados);

  try {
    const resultado = await registarInscricao(limpo);
    if (!resultado.ok && resultado.motivo === "cheio") {
      return json(
        { ok: false, erro: "Os 15 lugares já estão preenchidos." },
        409,
      );
    }
    if (!resultado.ok && resultado.motivo === "duplicado") {
      return json(
        {
          ok: false,
          erro: "Já existe uma inscrição com este email. Se precisares de corrigir alguma coisa, fala com os organizadores.",
        },
        409,
      );
    }
  } catch (error) {
    console.error("Falha ao guardar a inscrição.");
    console.error(error instanceof Error ? error.name : "erro");
    return json(
      { ok: false, erro: "Não conseguimos guardar a inscrição. Tenta outra vez." },
      500,
    );
  }

  return json({ ok: true, pagamentoUrl: linkPagamento() });
}
