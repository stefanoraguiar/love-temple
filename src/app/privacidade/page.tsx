import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { emailPrivacidade, evento } from "@/lib/evento";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Como o Love Temple trata o nome, o email e o telemóvel da inscrição. Sem cookies.",
};

export default function Privacidade() {
  const email = emailPrivacidade();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs tracking-[0.24em] text-primary uppercase">RGPD</p>
      <h1 className="mt-4 font-display text-6xl italic">Privacidade</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/85">
        Esta página explica, em português claro, o que acontece aos dados que
        deixas no formulário de inscrição do {evento.nome}.
      </p>

      <div className="mt-12 space-y-10 text-base leading-relaxed">
        <Secao titulo="Quem é responsável">
          <p>
            O responsável pelo tratamento é a {evento.responsavel}, para o
            encontro de {evento.dataLabel}.
          </p>
          {email ? (
            <p className="mt-3">
              Para exercer os teus direitos, escreve para{" "}
              <a className="underline underline-offset-4" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
          ) : (
            <p className="mt-3">
              O email dedicado a pedidos de privacidade ainda não está
              publicado. Até lá, usa o contacto dos organizadores no canal da
              comunidade onde recebeste este convite.
            </p>
          )}
        </Secao>

        <Secao titulo="O que recolhemos">
          <p>Só o que pedimos no formulário, e só se o enviares:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>nome</li>
            <li>email</li>
            <li>telemóvel</li>
            <li>a confirmação de que fazes parte da comunidade</li>
            <li>a confirmação de que tens 18 anos ou mais</li>
            <li>o consentimento para este tratamento</li>
          </ul>
          <p className="mt-3">
            Não pedimos dados de pagamento. Se continuares para a Stripe, o
            cartão é tratado por eles, no site deles, segundo a política da
            Stripe. Esse passo é separado desta inscrição.
          </p>
        </Secao>

        <Secao titulo="Para que servem">
          <p>
            Para gerir a tua participação neste encontro: confirmar o lugar,
            dizer-te o espaço quando estiver definido, e contactar-te se alguma
            coisa mudar. Não há newsletter, não há perfil, não há publicidade.
          </p>
        </Secao>

        <Secao titulo="Base legal">
          <p>
            O tratamento assenta no teu consentimento, artigo 6.º, n.º 1, alínea
            a) do RGPD. A caixa não vem preenchida. Se não consentires, a
            inscrição não é guardada.
          </p>
          <p className="mt-3">
            Podes retirar o consentimento a qualquer momento. Quando o fizeres,
            apagamos a inscrição e o lugar deixa de estar reservado.
          </p>
        </Secao>

        <Secao titulo="Quanto tempo ficam">
          <p>
            Guardamos a inscrição até 30 dias depois do encontro, ou seja, até{" "}
            {evento.retencao}. Depois apagamos o ficheiro com estes dados, a
            menos que peças o apagamento antes.
          </p>
        </Secao>

        <Secao titulo="Com quem são partilhados">
          <p>
            Os dados do formulário ficam com os organizadores, no servidor onde
            este site corre. Não os vendemos nem os passamos a ferramentas de
            marketing. A Stripe só recebe o que tu próprio introduzires na
            página de pagamento, se decidires avançar.
          </p>
        </Secao>

        <Secao titulo="Cookies e armazenamento">
          <p>
            Não usamos cookies. Não há analytics, pixels, sessões de login nem
            publicidade. Também não gravamos nada no teu browser: o aviso no
            fundo da página fecha só enquanto a página está aberta. Se
            atualizares, volta a aparecer, porque não o escondemos com um
            cookie nem com memória local.
          </p>
        </Secao>

        <Secao titulo="Os teus direitos">
          <p>Podes pedir:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>acesso aos dados que temos sobre ti</li>
            <li>correção, se alguma coisa estiver errada</li>
            <li>apagamento</li>
            <li>limitação do tratamento</li>
            <li>retirada do consentimento</li>
          </ul>
          <p className="mt-3">
            Também podes apresentar reclamação à Comissão Nacional de Proteção
            de Dados, em{" "}
            <a
              className="underline underline-offset-4"
              href="https://www.cnpd.pt"
              target="_blank"
              rel="noopener noreferrer"
            >
              cnpd.pt
            </a>
            .
          </p>
        </Secao>
      </div>

      <p className="mt-14">
        <Link href="/#inscricao" className="text-sm underline underline-offset-4">
          Voltar à inscrição
        </Link>
      </p>
    </main>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-3xl italic">{titulo}</h2>
      <div className="mt-3 text-foreground/88">{children}</div>
    </section>
  );
}
