import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { fotos } from "@/lib/fotos";
import { servicos, type Servico } from "@/lib/servicos";
import { linkWhatsApp, mensagens } from "@/lib/site";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

/**
 * Grade assimétrica de 6 colunas, sem célula vazia:
 * linha 1 = 4 + 2, linha 2 = 2 + 2 + 2, linha 3 = 3 + 3.
 * As classes ficam num mapa estático porque o Tailwind lê o código-fonte.
 */
const larguraDesktop: Record<Servico["colunas"], string> = {
  4: "lg:col-span-4",
  3: "lg:col-span-3",
  2: "lg:col-span-2",
};

const sizesPorColuna: Record<Servico["colunas"], string> = {
  4: "(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 92vw",
  3: "(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 92vw",
  2: "(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 92vw",
};

function Cartao({ servico, indice }: { servico: Servico; indice: number }) {
  const foto = fotos[servico.foto];
  const { destaque } = servico;

  return (
    <Revelar
      como="article"
      atraso={Math.min(indice, 4) * 60}
      className={`group flex flex-col overflow-hidden rounded-[14px] border border-linha bg-superficie transition-colors duration-300 ease-[var(--ease-saida)] hover:border-linha-forte ${
        destaque ? "sm:col-span-2" : ""
      } ${larguraDesktop[servico.colunas]}`}
    >
      {/* A foto ocupa a sobra de altura quando o card estica junto com o
          vizinho de linha, em vez de deixar um vazio embaixo do texto. */}
      <div
        className={`relative flex-1 overflow-hidden ${
          destaque
            ? "min-h-[clamp(13rem,26vw,21rem)]"
            : "min-h-[clamp(11rem,20vw,15rem)]"
        }`}
      >
        <Foto
          foto={foto}
          sizes={sizesPorColuna[servico.colunas]}
          preencher
          posicao="center 48%"
          className="transition-transform duration-500 ease-[var(--ease-saida)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-superficie"
        />
      </div>

      <div className="flex flex-col p-6 pt-5 sm:p-7 sm:pt-5">
        <h3
          className={`display-menor text-texto ${
            destaque ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-[1.375rem]"
          }`}
        >
          {servico.titulo}
        </h3>
        <p className="mt-3 max-w-[46ch] leading-relaxed text-suave">
          {servico.descricao}
        </p>

        <a
          href={linkWhatsApp(mensagens.servico(servico.termoOrcamento))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pedir orçamento de ${servico.titulo} pelo WhatsApp`}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-linha-forte px-4 py-2.5 text-[0.9375rem] font-semibold text-texto transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-saida)] hover:border-marca hover:bg-marca hover:text-breu active:scale-[0.97]"
        >
          Pedir orçamento
          <ArrowUpRight size={17} weight="bold" aria-hidden />
        </a>
      </div>
    </Revelar>
  );
}

export function Servicos() {
  return (
    <section id="servicos" className="relative scroll-mt-20 bg-breu-2 py-20 sm:py-28">
      <div aria-hidden className="fio-cromado absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Revelar className="max-w-[46rem]">
          <h2 className="display text-[clamp(2rem,4.6vw,3.5rem)] text-texto">
            Serviços
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-suave">
            Cada atendimento é combinado direto com você pelo WhatsApp, de
            acordo com o veículo e o que ele precisa.
          </p>
        </Revelar>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {servicos.map((servico, indice) => (
            <Cartao key={servico.id} servico={servico} indice={indice} />
          ))}
        </div>
      </div>
    </section>
  );
}
