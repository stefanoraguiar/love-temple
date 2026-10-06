import { InscriptionForm } from "@/components/inscription-form";
import { destinoInscricao, evento, linkPagamento } from "@/lib/evento";

const praticas = [
  "Meditação",
  "Movimento",
  "Dança",
  "Olhar",
  "Toque consciente",
  "Presença",
  "Comunicação",
  "Desejo",
];

const acordos = [
  {
    titulo: "Intenção",
    texto: "Há devoção e há brincadeira. As duas cabem. O templo pede que chegues presente, sem um guião fechado.",
  },
  {
    titulo: "Escolha",
    texto: "Cada pessoa participa apenas no que quiser. Podes ficar de fora de qualquer prática, a qualquer momento.",
  },
  {
    titulo: "Limite",
    texto: "O corpo e o desejo de cada um merecem respeito. Um não fica um não, e ninguém insiste.",
  },
];

export default function Page() {
  const emailDestino = destinoInscricao();
  const pagamentoUrl = linkPagamento();

  return (
    <main>
      <section className="border-b border-primary/15">
        <div className="hero-glow">
          <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 sm:pt-12">
            <img
              src="/fotos/hero.webp"
              alt="Tecido vermelho à luz de velas, com as palavras Love Temple, sensualidade e erotismo."
              width={1024}
              height={602}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full border border-primary/20"
            />
          </div>
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end lg:pt-20 lg:pb-28">
          <div>
            <p className="text-xs tracking-[0.28em] text-primary uppercase">
              Primeiro encontro · só a comunidade
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.6rem,14vw,7.5rem)] leading-[0.88] font-medium tracking-tight italic">
              Love Temple
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
              Um espaço para honrar a energia erótica, onde as energias do feminino e do
              masculino se encontram e fazem magia. Devoção, exploração e
              brincadeira — com limites claros.
            </p>
            <p className="mt-6 text-sm tracking-wide text-foreground/70">
              <time dateTime={evento.dataISO}>{evento.diaSemana}, {evento.dataLabel}</time>
              {" · "}
              {evento.horario}
            </p>
          </div>

          <aside className="border border-primary/30 bg-card/50 p-7 sm:p-8">
            <p className="font-display text-7xl leading-none text-primary italic">
              {evento.lugares}
            </p>
            <p className="mt-2 text-xs tracking-[0.24em] uppercase">lugares</p>
            <dl className="mt-8 grid gap-5 text-sm">
              <div>
                <dt className="text-xs tracking-[0.18em] text-primary uppercase">
                  Quando
                </dt>
                <dd className="mt-1 font-display text-2xl italic">
                  {evento.horario}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] text-primary uppercase">
                  Onde
                </dt>
                <dd className="mt-1 font-display text-2xl italic">{evento.local}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] text-primary uppercase">
                  Valor
                </dt>
                <dd className="mt-1 font-display text-2xl italic">{evento.valor}</dd>
              </div>
            </dl>
          </aside>
          </div>
        </div>
      </section>

      <section id="templo" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Ornamento />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
            <h2 className="font-display text-5xl leading-none italic sm:text-6xl lg:col-start-1 lg:row-start-1">
              O templo
            </h2>
            <img
              src="/fotos/templo.webp"
              alt="Pessoa de chapéu alto e vestido preto com bolas brancas, à luz vermelha."
              width={680}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-auto w-full border border-primary/20 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            />
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/88 lg:col-start-1 lg:row-start-2">
              <p>
                Um Love Temple é um espaço criado para honrar a energia erótica
                através de práticas de honra e devoção à energia feminina e à
                energia masculina. Onde elas se encontram e fazem magia.
              </p>
              <p>
                Quando um templo começa, nunca se sabe como se vai desenrolar.
                Há um misticismo que o erotismo e a sensualidade trazem, e que
                não cabe num programa fechado.
              </p>
              <p>
                É um lugar de devoção, que pede intenção. É também um lugar de
                exploração e de brincadeira.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/15 bg-card/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="font-display text-5xl italic sm:text-6xl">
            O que pode incluir
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
            A noite pode passar por estas portas. Nenhuma é obrigatória. A ideia
            é experimentar formas diferentes de estar em relação e no corpo, com
            curiosidade e com cuidado.
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {praticas.map((pratica) => (
              <li key={pratica} className="font-display text-3xl leading-tight italic">
                {pratica}
              </li>
            ))}
          </ul>
          <img
            src="/fotos/praticas.webp"
            alt="Duas pessoas de chapéu, frente a frente, quase às escuras."
            width={1024}
            height={679}
            loading="lazy"
            decoding="async"
            className="mt-14 h-auto w-full border border-primary/20"
          />
        </div>
      </section>

      <section id="acordos" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="max-w-xl font-display text-5xl italic sm:text-6xl">
            Três acordos para a noite
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {acordos.map((acordo, indice) => (
              <li key={acordo.titulo} className="border-t border-primary/30 pt-5">
                <p className="text-xs tracking-[0.22em] text-primary uppercase">
                  0{indice + 1}
                </p>
                <h3 className="mt-3 font-display text-4xl italic">{acordo.titulo}</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  {acordo.texto}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid items-center gap-10 md:grid-cols-[minmax(200px,0.7fr)_minmax(0,1.3fr)] md:gap-14">
            <img
              src="/fotos/presenca.webp"
              alt="Homem sem camisa, à luz de uma vela, com a mão sobre a coxa."
              width={679}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-auto w-full border border-primary/20"
            />
            <p className="font-display text-3xl leading-snug italic text-foreground/90 sm:text-4xl">
              “Quando um templo começa, nunca se sabe como se vai desenrolar.”
            </p>
          </div>
        </div>
      </section>

      <section id="encontro" className="scroll-mt-24 border-t border-primary/15">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
          <h2 className="font-display text-5xl italic sm:text-6xl">O encontro</h2>
          <dl className="grid gap-6">
            <Linha termo="Data" valor={`${evento.diaSemana}, ${evento.dataLabel}`} />
            <Linha
              termo="Horário"
              valor={evento.fuso ? `${evento.horario}, ${evento.fuso}` : evento.horario}
            />
            <Linha
              termo="Local"
              valor="Porto, local final ainda por definir. Quem estiver inscrito recebe a informação antes da noite."
            />
            <Linha termo="Quem" valor="Apenas pessoas da nossa comunidade, maiores de 18 anos." />
            <Linha termo="Lugares" valor="15. Quando fecham, fecham." />
            <Linha
              termo="Valor"
              valor="20€. O pagamento faz-se num link Stripe, depois da inscrição."
            />
          </dl>
        </div>
      </section>

      <section id="inscricao" className="scroll-mt-24 border-t border-primary/15">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-display text-5xl italic sm:text-6xl">
              Guarda a data
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/85">
              Dia 13 de outubro, das 19h às 23h. Primeiro deixa os teus dados.
              Depois, se o link já estiver ativo, concluis o pagamento na Stripe.
            </p>
          </div>
          {evento.inscricoesAbertas ? (
            <InscriptionForm
              pagamentoUrl={pagamentoUrl}
              emailDestino={emailDestino}
            />
          ) : (
            <div className="invitation px-6 py-10 sm:px-10">
              <p className="text-xs tracking-[0.22em] text-primary uppercase">
                Lotação
              </p>
              <h3 className="mt-3 font-display text-4xl italic">
                Os 15 lugares estão preenchidos.
              </h3>
              <p className="mt-4 leading-relaxed">
                Esta noite ficou completa. Se já te inscreveste, guarda o email
                que usaste — é por aí que os organizadores te contactam.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Ornamento() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px w-16 bg-primary/70" />
      <span className="size-1.5 rotate-45 bg-primary" />
    </div>
  );
}

function Linha({ termo, valor }: { termo: string; valor: string }) {
  return (
    <div className="grid gap-1 border-b border-primary/15 pb-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <dt className="text-xs tracking-[0.18em] text-primary uppercase">{termo}</dt>
      <dd className="text-base leading-relaxed">{valor}</dd>
    </div>
  );
}
