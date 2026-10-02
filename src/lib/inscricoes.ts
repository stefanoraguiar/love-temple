import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { evento } from "@/lib/evento";

export type Inscricao = {
  id: string;
  nome: string;
  email: string;
  telemovel: string;
  criadoEm: string;
};

const pasta = path.join(process.cwd(), "data");
const ficheiro = path.join(pasta, "inscricoes.json");

let fila: Promise<unknown> = Promise.resolve();

function emFila<T>(tarefa: () => Promise<T>): Promise<T> {
  const resultado = fila.then(tarefa, tarefa);
  fila = resultado.then(
    () => undefined,
    () => undefined,
  );
  return resultado;
}

async function ler(): Promise<Inscricao[]> {
  try {
    const bruto = await readFile(ficheiro, "utf8");
    const dados: unknown = JSON.parse(bruto);
    if (!Array.isArray(dados)) {
      throw new Error("O ficheiro de inscrições não é uma lista.");
    }
    return dados as Inscricao[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function gravar(lista: Inscricao[]) {
  await mkdir(pasta, { recursive: true });
  const temporario = `${ficheiro}.${process.pid}.tmp`;
  await writeFile(temporario, `${JSON.stringify(lista, null, 2)}\n`, "utf8");
  await rename(temporario, ficheiro);
}

export function contarInscricoes(): Promise<number> {
  return emFila(async () => (await ler()).length);
}

export type ResultadoRegisto =
  | { ok: true }
  | { ok: false; motivo: "cheio" | "duplicado" };

export function registarInscricao(entrada: {
  nome: string;
  email: string;
  telemovel: string;
}): Promise<ResultadoRegisto> {
  return emFila(async () => {
    const lista = await ler();
    if (lista.length >= evento.lugares) return { ok: false, motivo: "cheio" };
    if (lista.some((item) => item.email === entrada.email)) {
      return { ok: false, motivo: "duplicado" };
    }
    lista.push({
      id: crypto.randomUUID(),
      nome: entrada.nome,
      email: entrada.email,
      telemovel: entrada.telemovel,
      criadoEm: new Date().toISOString(),
    });
    await gravar(lista);
    return { ok: true };
  });
}
