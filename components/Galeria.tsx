"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react/dist/ssr";
import { fotos, type FotoId } from "@/lib/fotos";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

/** Ordem escolhida para alternar carros, motos, detalhes e veículos grandes. */
const ordem: FotoId[] = [
  "motocicletas-4",
  "lavagem-completa-1",
  "cristalizacao-vidro-3",
  "lavagem-motor-1",
  "motocicletas-2",
  "lavagem-completa-2",
  "higienizacao-interna-1",
  "caminhoes-guinchos-2",
  "motocicletas-1",
  "lavagem-chassi-1",
  "cristalizacao-vidro-2",
  "lavagem-motor-2",
  "motocicletas-3",
  "caminhoes-guinchos-1",
  "cristalizacao-vidro-4",
];

export function Galeria() {
  const [aberta, setAberta] = useState<number | null>(null);
  const gatilhos = useRef<(HTMLButtonElement | null)[]>([]);
  const painel = useRef<HTMLDivElement>(null);
  const ultimoGatilho = useRef<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);

  const mover = useCallback((passo: number) => {
    setAberta((atual) => {
      if (atual === null) return atual;
      return (atual + passo + ordem.length) % ordem.length;
    });
  }, []);

  useEffect(() => {
    if (aberta === null) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painel.current?.focus();

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") fechar();
      if (evento.key === "ArrowRight") mover(1);
      if (evento.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberta, fechar, mover]);

  // Devolve o foco à miniatura que abriu a imagem.
  useEffect(() => {
    if (aberta !== null) {
      ultimoGatilho.current = aberta;
      return;
    }
    const indice = ultimoGatilho.current;
    if (indice === null) return;
    gatilhos.current[indice]?.focus();
    ultimoGatilho.current = null;
  }, [aberta]);

  const fotoAtual = aberta === null ? null : fotos[ordem[aberta]];

  return (
    <section id="galeria" className="relative scroll-mt-20 bg-breu py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Revelar className="max-w-[46rem]">
          <h2 className="display text-[clamp(2rem,4.6vw,3.5rem)] text-texto">
            Detalhes que fazem a diferença
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-suave">
            Veja um pouco do cuidado aplicado em cada veículo.
          </p>
        </Revelar>

        {/* Grade fechada em vez de masonry: 15 fotos cabem exatas em 5 x 3 no
            desktop e 3 x 5 no tablet. No celular a primeira abre a grade em
            largura dupla e as outras 14 fecham 7 linhas certas.
            A proporção fica no botão (classes) e não no estilo inline da foto,
            para as variantes responsivas realmente valerem. */}
        <Revelar atraso={100} className="mt-12">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
            {ordem.map((id, indice) => {
              const foto = fotos[id];
              const abreGrade = indice === 0;
              return (
                <button
                  key={id}
                  type="button"
                  ref={(no) => {
                    gatilhos.current[indice] = no;
                  }}
                  onClick={() => setAberta(indice)}
                  aria-label={`Ampliar foto: ${foto.alt}`}
                  className={`placa group relative block w-full cursor-zoom-in transition-transform duration-300 ease-[var(--ease-saida)] active:scale-[0.985] ${
                    abreGrade
                      ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[3/4]"
                      : "aspect-[3/4]"
                  }`}
                >
                  <Foto
                    foto={foto}
                    sizes="(min-width: 1024px) 19vw, (min-width: 768px) 31vw, (min-width: 640px) 47vw, 94vw"
                    preencher
                    posicao={abreGrade ? "center 55%" : "center 45%"}
                    className="transition-[transform,filter] duration-500 ease-[var(--ease-saida)] group-hover:scale-[1.05] group-hover:brightness-110"
                  />
                </button>
              );
            })}
          </div>
        </Revelar>
      </div>

      {fotoAtual && aberta !== null && (
        <div
          className="lightbox fixed inset-0 z-[70] flex items-center justify-center bg-breu/95 p-4 backdrop-blur-md sm:p-8"
          onClick={fechar}
        >
          <div
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${aberta + 1} de ${ordem.length}: ${fotoAtual.alt}`}
            tabIndex={-1}
            onClick={(evento) => evento.stopPropagation()}
            className="lightbox-painel relative flex max-h-full w-full max-w-[min(92vw,44rem)] flex-col items-center gap-4 outline-none"
          >
            <img
              src={fotoAtual.src}
              srcSet={fotoAtual.srcSet}
              sizes="(min-width: 640px) 44rem, 92vw"
              width={fotoAtual.largura}
              height={fotoAtual.altura}
              alt={fotoAtual.alt}
              className="max-h-[74vh] w-auto rounded-xl object-contain shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]"
            />

            <p className="max-w-[60ch] text-center text-sm leading-relaxed text-suave">
              {fotoAtual.alt}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Foto anterior"
                className="inline-flex size-11 items-center justify-center rounded-full border border-linha-forte bg-superficie text-texto transition-[transform,border-color] duration-150 ease-[var(--ease-saida)] hover:border-marca active:scale-[0.94]"
              >
                <CaretLeft size={20} weight="bold" aria-hidden />
              </button>

              <span
                aria-hidden
                className="min-w-[4.5rem] text-center text-sm tabular-nums text-suave"
              >
                {aberta + 1} de {ordem.length}
              </span>

              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Próxima foto"
                className="inline-flex size-11 items-center justify-center rounded-full border border-linha-forte bg-superficie text-texto transition-[transform,border-color] duration-150 ease-[var(--ease-saida)] hover:border-marca active:scale-[0.94]"
              >
                <CaretRight size={20} weight="bold" aria-hidden />
              </button>
            </div>

            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar galeria"
              className="absolute -top-1 right-0 inline-flex size-11 -translate-y-full items-center justify-center rounded-full border border-linha-forte bg-superficie text-texto transition-[transform,border-color] duration-150 ease-[var(--ease-saida)] hover:border-marca active:scale-[0.94] sm:-top-3"
            >
              <X size={20} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
