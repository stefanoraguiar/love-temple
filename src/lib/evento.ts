/**
 * Dados do encontro. O link Stripe e o email de privacidade
 * vêm das variáveis de ambiente — vê .env.example.
 */

function linkStripeSeguro(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname;
    const permitido =
      host === "buy.stripe.com" ||
      host === "checkout.stripe.com" ||
      host.endsWith(".stripe.com");
    return permitido ? parsed.toString() : null;
  } catch {
    return null;
  }
}

let avisouLink = false;

export function linkPagamento(): string | null {
  const bruto = process.env.STRIPE_PAYMENT_LINK?.trim() ?? "";
  if (!bruto) return null;
  const link = linkStripeSeguro(bruto);
  if (!link && !avisouLink) {
    avisouLink = true;
    console.warn(
      "STRIPE_PAYMENT_LINK tem de ser um URL https num domínio stripe.com.",
    );
  }
  return link;
}

export function emailPrivacidade(): string | null {
  const email = process.env.CONTACT_EMAIL?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export const evento = {
  nome: "Love Temple",
  responsavel: "Organização do Love Temple",
  dataISO: "2026-10-13",
  dataLabel: "13 de outubro de 2026",
  diaSemana: "Terça-feira",
  horario: "19h às 23h",
  fuso: "hora de Lisboa",
  local: "Espaço a anunciar",
  lugares: 15,
  valor: "Valor simbólico",
  retencao: "12 de novembro de 2026",
} as const;
