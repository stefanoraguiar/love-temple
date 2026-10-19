"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  perguntasFeedback,
  type IdPerguntaFeedback,
  type RespostasFeedback,
} from "@/lib/feedback";

const escalas: RespostasFeedback = {
  geral: null,
  seguranca: null,
  acordos: null,
  ritmo: null,
  indicaria: null,
  comentario: "",
};

const notas = [1, 2, 3, 4, 5] as const;

export function FeedbackForm({ endpoint }: { endpoint: string | null }) {
  const [estado, setEstado] = useState<RespostasFeedback>(escalas);
  const [honeypot, setHoneypot] = useState("");
  const [erros, setErros] = useState<Partial<Record<IdPerguntaFeedback, string>>>(
    {},
  );
  const [erroGeral, setErroGeral] = useState("");
  const [aEnviar, setAEnviar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function escolher(id: IdPerguntaFeedback, valor: number) {
    setEstado((atual) => ({ ...atual, [id]: valor }));
    setErros((atual) => {
      const seguinte = { ...atual };
      delete seguinte[id];
      return seguinte;
    });
  }

  async function submeter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErroGeral("");

    if (honeypot.trim()) {
      setEnviado(true);
      return;
    }

    const faltam: Partial<Record<IdPerguntaFeedback, string>> = {};
    for (const pergunta of perguntasFeedback) {
      if (estado[pergunta.id] == null) {
        faltam[pergunta.id] = "Escolhe uma nota de 1 a 5.";
      }
    }
    setErros(faltam);
    if (Object.keys(faltam).length > 0) return;

    if (!endpoint) {
      setErroGeral(
        "O destino das respostas ainda não está ligado. Até lá, o envio fica nesta página.",
      );
      return;
    }

    setAEnviar(true);
    try {
      const resposta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          geral: estado.geral,
          seguranca: estado.seguranca,
          acordos: estado.acordos,
          ritmo: estado.ritmo,
          indicaria: estado.indicaria,
          comentario: estado.comentario.trim().slice(0, 2000),
        }),
        redirect: "follow",
      });

      if (!resposta.ok) {
        setErroGeral("O envio não chegou à folha. Tenta outra vez daqui a pouco.");
        return;
      }

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
          Feedback enviado
        </p>
        <h2 className="mt-3 font-display text-4xl italic">Obrigado.</h2>
        <p className="mt-4 text-base leading-relaxed">
          A tua resposta chegou de forma anónima. Não pedimos nome nem contacto,
          e não a ligamos à inscrição.
        </p>
      </div>
    );
  }

  return (
    <form
      className="invitation px-6 py-8 sm:px-10 sm:py-10"
      onSubmit={submeter}
      noValidate
    >
      <p className="text-xs tracking-[0.22em] text-primary uppercase">Eco</p>
      <h2 className="mt-2 font-display text-4xl italic">A tua leitura da noite</h2>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Cinco notas e, se quiseres, um texto livre. É anónimo: não pedimos nome,
        email nem telemóvel. Os organizadores não conseguem ligar isto à tua
        inscrição.
      </p>

      {!endpoint ? (
        <p className="mt-4 border border-primary/30 px-4 py-3 text-sm leading-relaxed">
          O destino das respostas ainda não está ligado. Podes preencher o
          formulário, mas o envio fica nesta página até isso acontecer.
        </p>
      ) : null}

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {erroGeral ? (
        <p
          role="alert"
          className="mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive"
        >
          {erroGeral}
        </p>
      ) : null}

      <div className="mt-10 grid gap-10">
        {perguntasFeedback.map((pergunta, indice) => {
          const erro = erros[pergunta.id];
          const erroId = `${pergunta.id}-erro`;
          return (
            <fieldset key={pergunta.id} className="grid gap-3">
              <legend className="font-display text-2xl italic">
                <span className="mr-2 text-sm tracking-[0.18em] text-primary not-italic uppercase">
                  0{indice + 1}
                </span>
                {pergunta.texto}
              </legend>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs tracking-wide text-muted-foreground">
                <span>1 · {pergunta.minimo}</span>
                <span>5 · {pergunta.maximo}</span>
              </div>
              <div
                className="grid grid-cols-5 gap-2"
                role="radiogroup"
                aria-describedby={erro ? erroId : undefined}
                aria-invalid={erro ? true : undefined}
              >
                {notas.map((nota) => {
                  const selecionada = estado[pergunta.id] === nota;
                  return (
                    <button
                      key={nota}
                      type="button"
                      role="radio"
                      aria-checked={selecionada}
                      aria-label={`${nota} de 5`}
                      onClick={() => escolher(pergunta.id, nota)}
                      className={
                        selecionada
                          ? "h-12 border border-primary bg-primary text-primary-foreground font-display text-xl italic transition-colors"
                          : "h-12 border border-primary/30 bg-white/40 font-display text-xl italic transition-colors hover:border-primary/60"
                      }
                    >
                      {nota}
                    </button>
                  );
                })}
              </div>
              {erro ? (
                <p id={erroId} className="text-sm text-destructive">
                  {erro}
                </p>
              ) : null}
            </fieldset>
          );
        })}

        <div className="grid gap-2">
          <Label htmlFor="comentario" className="font-display text-2xl italic">
            <span className="mr-2 text-sm tracking-[0.18em] text-primary not-italic uppercase">
              06
            </span>
            Queres deixar mais alguma coisa?
          </Label>
          <p className="text-sm text-muted-foreground">Opcional.</p>
          <textarea
            id="comentario"
            name="comentario"
            rows={5}
            maxLength={2000}
            value={estado.comentario}
            onChange={(event) =>
              setEstado((atual) => ({
                ...atual,
                comentario: event.target.value,
              }))
            }
            className="w-full resize-y border border-input bg-white/50 px-3 py-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={aEnviar}
        className="mt-10 h-12 w-full rounded-full text-base sm:w-auto sm:px-8"
      >
        {aEnviar ? "A enviar…" : "Enviar feedback"}
      </Button>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Sem cookies. Sem campos de contacto. Só as respostas desta página.
      </p>
    </form>
  );
}
