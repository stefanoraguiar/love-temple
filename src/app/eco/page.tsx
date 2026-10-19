import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/feedback-form";
import { endpointFeedback } from "@/lib/feedback";
import { evento } from "@/lib/evento";

export const metadata: Metadata = {
  title: "Eco",
  description: `Feedback anónimo sobre o ${evento.nome}.`,
  robots: { index: false, follow: false },
};

export default function EcoPage() {
  const endpoint = endpointFeedback();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs tracking-[0.24em] text-primary uppercase">
        Só por convite
      </p>
      <h1 className="mt-4 font-display text-6xl italic">Eco</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/85">
        Um espaço privado para dizeres como foi a noite do {evento.nome}. As
        respostas são anónimas e servem só para os organizadores ouvirem a
        comunidade.
      </p>

      <div className="mt-12">
        <FeedbackForm endpoint={endpoint} />
      </div>

      <p className="mt-14">
        <Link href="/privacidade" className="text-sm underline underline-offset-4">
          Privacidade
        </Link>
      </p>
    </main>
  );
}
