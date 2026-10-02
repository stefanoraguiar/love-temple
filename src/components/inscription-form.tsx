"use client";

import { useState, type FormEvent, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validarInscricao, type ErrosInscricao } from "@/lib/validacao";

type Estado = {
  nome: string;
  email: string;
  telemovel: string;
  comunidade: boolean;
  maioridade: boolean;
  consentimento: boolean;
  empresa: string;
};

const inicial: Estado = {
  nome: "",
  email: "",
  telemovel: "",
  comunidade: false,
  maioridade: false,
  consentimento: false,
  empresa: "",
};

export function InscriptionForm({ restantes }: { restantes: number }) {
  const [estado, setEstado] = useState<Estado>(inicial);
  const [erros, setErros] = useState<ErrosInscricao>({});
  const [erroGeral, setErroGeral] = useState("");
  const [aEnviar, setAEnviar] = useState(false);
  const [pagamentoUrl, setPagamentoUrl] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  function atualizar<K extends keyof Estado>(campo: K, valor: Estado[K]) {
    setEstado((atual) => ({ ...atual, [campo]: valor }));
  }

  async function submeter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErroGeral("");
    const encontrados = validarInscricao(estado);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setAEnviar(true);
    try {
      const resposta = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify(estado),
      });
      const corpo = (await resposta.json()) as {
        ok?: boolean;
        erro?: string;
        erros?: ErrosInscricao;
        pagamentoUrl?: string | null;
      };

      if (!resposta.ok || !corpo.ok) {
        if (corpo.erros) setErros(corpo.erros);
        setErroGeral(corpo.erro || "Não foi possível enviar a inscrição.");
        return;
      }

      setPagamentoUrl(corpo.pagamentoUrl ?? null);
      setEnviado(true);
    } catch {
      setErroGeral("Sem ligação. Verifica a rede e tenta outra vez.");
    } finally {
      setAEnviar(false);
    }
  }

  if (enviado) {
    return (
      <div className="invitation px-6 py-10 sm:px-10">
        <p className="text-xs tracking-[0.22em] text-primary uppercase">
          Inscrição recebida
        </p>
        <h3 className="mt-3 font-display text-4xl italic">Guarda a data.</h3>
        <p className="mt-4 text-base leading-relaxed">
          Ficou registada a inscrição de {estado.nome.trim()}, com o email{" "}
          {estado.email.trim()}. São quinze lugares. O lugar confirma-se com o
          pagamento simbólico, numa página da Stripe. Não guardamos dados de
          cartão.
        </p>
        {pagamentoUrl ? (
          <Button asChild className="mt-8 h-12 rounded-full px-6 text-base">
            <a href={pagamentoUrl} target="_blank" rel="noopener noreferrer">
              Continuar para o pagamento
            </a>
          </Button>
        ) : (
          <p className="mt-6 border border-primary/30 px-4 py-3 text-sm leading-relaxed">
            O link Stripe ainda não está publicado. A inscrição mantém-se
            guardada. Quando o pagamento abrir, o link aparece aqui e na
            comunidade.
          </p>
        )}
      </div>
    );
  }

  const lugares =
    restantes === 1 ? "Resta 1 lugar." : `Restam ${restantes} de 15 lugares.`;

  return (
    <form className="invitation px-6 py-8 sm:px-10 sm:py-10" onSubmit={submeter} noValidate>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.22em] text-primary uppercase">
            Inscrição
          </p>
          <h3 className="mt-2 font-display text-4xl italic">O teu lugar</h3>
        </div>
        <p className="text-sm">{lugares}</p>
      </div>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Nome, email e telemóvel. Servem para te contactar sobre este encontro e
        para mais nada. O pagamento é o passo seguinte, na Stripe.
      </p>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="empresa">Empresa</label>
        <input
          id="empresa"
          name="empresa"
          tabIndex={-1}
          autoComplete="off"
          value={estado.empresa}
          onChange={(event) => atualizar("empresa", event.target.value)}
        />
      </div>

      {erroGeral ? (
        <p role="alert" className="mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive">
          {erroGeral}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5">
        <Campo
          id="nome"
          label="Nome"
          erro={erros.nome}
          autoComplete="name"
          value={estado.nome}
          onChange={(valor) => atualizar("nome", valor)}
        />
        <Campo
          id="email"
          label="Email"
          type="email"
          erro={erros.email}
          autoComplete="email"
          inputMode="email"
          value={estado.email}
          onChange={(valor) => atualizar("email", valor)}
        />
        <Campo
          id="telemovel"
          label="Telemóvel"
          type="tel"
          erro={erros.telemovel}
          autoComplete="tel"
          inputMode="tel"
          placeholder="912 345 678"
          value={estado.telemovel}
          onChange={(valor) => atualizar("telemovel", valor)}
        />
      </div>

      <div className="mt-8 grid gap-4">
        <Aceite
          id="comunidade"
          checked={estado.comunidade}
          erro={erros.comunidade}
          onChange={(valor) => atualizar("comunidade", valor)}
        >
          Confirmo que faço parte da comunidade anfitriã.
        </Aceite>
        <Aceite
          id="maioridade"
          checked={estado.maioridade}
          erro={erros.maioridade}
          onChange={(valor) => atualizar("maioridade", valor)}
        >
          Confirmo que tenho 18 anos ou mais.
        </Aceite>
        <Aceite
          id="consentimento"
          checked={estado.consentimento}
          erro={erros.consentimento}
          onChange={(valor) => atualizar("consentimento", valor)}
        >
          Consinto o tratamento do meu nome, email e telemóvel para gerir esta
          inscrição, nos termos da{" "}
          <Link href="/privacidade" className="underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </Aceite>
      </div>

      <Button
        type="submit"
        disabled={aEnviar}
        className="mt-8 h-12 w-full rounded-full text-base sm:w-auto sm:px-8"
      >
        {aEnviar ? "A enviar…" : "Enviar inscrição"}
      </Button>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Não há cookies. Podes retirar o consentimento quando quiseres — a
        inscrição é apagada e o lugar deixa de estar reservado.
      </p>
      <noscript>
        <p className="mt-4 text-sm">
          Para enviar a inscrição, o JavaScript tem de estar ativo. Mesmo assim,
          não usamos cookies.
        </p>
      </noscript>
    </form>
  );
}

function Campo({
  id,
  label,
  erro,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
}: {
  id: string;
  label: string;
  erro?: string;
  value: string;
  onChange: (valor: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  const erroId = `${id}-erro`;
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? erroId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 bg-white/50 px-3 text-base md:text-base"
      />
      {erro ? (
        <p id={erroId} className="text-sm text-destructive">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

function Aceite({
  id,
  checked,
  onChange,
  erro,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (valor: boolean) => void;
  erro?: string;
  children: ReactNode;
}) {
  const erroId = `${id}-erro`;
  return (
    <div className="grid gap-1.5">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(valor) => onChange(valor === true)}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? erroId : undefined}
          className="mt-0.5 size-5"
        />
        <Label htmlFor={id} className="inline text-sm leading-snug font-normal">
          {children}
        </Label>
      </div>
      {erro ? (
        <p id={erroId} className="pl-8 text-sm text-destructive">
          {erro}
        </p>
      ) : null}
    </div>
  );
}
