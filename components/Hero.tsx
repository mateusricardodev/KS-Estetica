import { ArrowDown, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { fotos } from "@/lib/fotos";
import { site, whatsappGeral } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      {/* Campo de fundo: a lataria polida vira atmosfera, não assunto. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Foto
          foto={fotos["lavagem-completa-1"]}
          sizes="100vw"
          prioridade
          posicao="60% 42%"
          className="opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_35%,rgba(5,7,14,0.97)_28%,rgba(5,7,14,0.72)_58%,rgba(5,7,14,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-breu" />
      </div>

      <div className="mx-auto grid min-h-[100dvh] max-w-[1320px] grid-cols-1 items-center gap-10 px-5 pt-24 pb-14 md:px-8 lg:grid-cols-12 lg:gap-14 lg:pt-24 lg:pb-20">
        <div className="lg:col-span-7">
          <h1 className="hero-entrada display text-[clamp(2.25rem,6.6vw,4.75rem)] text-texto">
            Muito além
            <br />
            de uma lavagem<span className="text-marca">.</span>
          </h1>

          {/* As ondas do logo, desenhadas uma vez: o risco de velocidade
              que assina a marca. pathLength=1 deixa o traço proporcional. */}
          <svg
            aria-hidden
            viewBox="0 0 160 22"
            fill="none"
            className="risco mt-5 h-[22px] w-40 text-marca"
          >
            <path pathLength={1} d="M2 8 C 40 2, 90 2, 158 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path pathLength={1} d="M14 14 C 52 9, 98 9, 146 15" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <path pathLength={1} d="M30 20 C 62 16, 100 16, 132 20" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <p
            className="hero-entrada mt-5 max-w-[46ch] text-lg leading-relaxed text-suave sm:text-xl"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Na {site.nome}, cuidamos de cada detalhe para valorizar e proteger o
            seu veículo.
          </p>

          <div
            className="hero-entrada mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <Botao href={whatsappGeral} externo tamanho="grande">
              <WhatsappLogo size={22} weight="fill" aria-hidden />
              Solicitar orçamento
            </Botao>
            <Botao href="#servicos" variante="secundario" tamanho="grande">
              Ver serviços
              <ArrowDown size={18} weight="bold" aria-hidden />
            </Botao>
          </div>

          <p
            className="hero-entrada mt-9 flex items-center gap-3 text-sm tracking-[0.02em] text-suave"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <span aria-hidden className="h-px w-8 bg-marca" />
            Carros, motos, caminhões e guinchos
          </p>
        </div>

        {/* Objeto em primeiro plano: o formato vertical das fotos reais vira
            a moldura, em vez de ser cortado para caber num banner. */}
        <div className="hero-entrada lg:col-span-5" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="placa brilho-varredura mx-auto max-w-[19rem] sm:max-w-[21rem] lg:ml-auto lg:max-w-none">
            <Foto
              foto={fotos["motocicletas-4"]}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 22rem, 78vw"
              aspecto="4 / 5"
              prioridade
              posicao="center 58%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
