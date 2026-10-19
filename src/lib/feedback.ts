/** Perguntas e destino do feedback anónimo em `/eco/`. */

export const perguntasFeedback = [
  {
    id: "geral",
    texto: "Como foi a noite, no geral?",
    minimo: "Fraca",
    maximo: "Excelente",
  },
  {
    id: "seguranca",
    texto: "Sentiste-te em segurança e respeitada/o?",
    minimo: "Não",
    maximo: "Sim, plenamente",
  },
  {
    id: "acordos",
    texto: "Os acordos e a facilitação foram claros?",
    minimo: "Não",
    maximo: "Sim, muito",
  },
  {
    id: "ritmo",
    texto: "O ritmo e o equilíbrio da noite funcionaram para ti?",
    minimo: "Não",
    maximo: "Sim, muito",
  },
  {
    id: "indicaria",
    texto: "Numa escala de 1 a 5, o quanto indicaria para um amigo?",
    minimo: "Não indicaria",
    maximo: "Indicaria com certeza",
  },
] as const;

export type IdPerguntaFeedback = (typeof perguntasFeedback)[number]["id"];

export type RespostasFeedback = Record<IdPerguntaFeedback, number | null> & {
  comentario: string;
};

export function endpointFeedback(): string | null {
  const bruto =
    process.env.FEEDBACK_ENDPOINT?.trim() ??
    process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT?.trim() ??
    "";
  if (!bruto) return null;
  try {
    const parsed = new URL(bruto);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname;
    const permitido =
      host === "script.google.com" ||
      host === "script.googleusercontent.com" ||
      host.endsWith(".google.com") ||
      host.endsWith(".googleusercontent.com");
    return permitido ? parsed.toString() : null;
  } catch {
    return null;
  }
}
