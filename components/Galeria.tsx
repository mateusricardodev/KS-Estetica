"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Play, X } from "@phosphor-icons/react/dist/ssr";
import { fotos, type FotoId } from "@/lib/fotos";
import { videos, type VideoId } from "@/lib/videos";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

type Item = { tipo: "foto"; id: FotoId } | { tipo: "video"; id: VideoId };
const f = (id: FotoId): Item => ({ tipo: "foto", id });
const v = (id: VideoId): Item => ({ tipo: "video", id });

/**
 * 20 itens: fecham certo em 2, 4 e 5 colunas.
 * A ordem alterna carros, motos, detalhes, veículos grandes e vídeo.
 */
const ordem: Item[] = [
  f("motocicletas-4"),
  f("carro-antigo-1"),
  f("lavagem-completa-1"),
  v("lavagem-suv"),
  f("cristalizacao-vidro-3"),
  f("lavagem-motor-1"),
  f("motocicletas-2"),
  f("fachada-ks"),
  f("lavagem-completa-2"),
  f("higienizacao-interna-1"),
  f("carro-antigo-2"),
  f("caminhoes-guinchos-2"),
  f("motocicletas-1"),
  f("lavagem-chassi-1"),
  f("lavagem-motor-3"),
  f("cristalizacao-vidro-2"),
  f("lavagem-motor-2"),
  f("motocicletas-3"),
  f("caminhoes-guinchos-1"),
  f("cristalizacao-vidro-4"),
];

const descricao = (item: Item) =>
  item.tipo === "foto" ? fotos[item.id].alt : videos[item.id].descricao;

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

  const itemAtual = aberta === null ? null : ordem[aberta];

  return (
    <section id="galeria" className="relative scroll-mt-20 bg-breu py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Revelar className="max-w-[46rem]">
          <h2 className="passada display text-[clamp(2rem,4.6vw,3.5rem)] text-texto">
            Detalhes que fazem a diferença
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-suave">
            Veja um pouco do cuidado aplicado em cada veículo.
          </p>
        </Revelar>

        {/* Grade fechada: 20 itens em 2, 4 e 5 colunas, sem célula vazia. */}
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
            {ordem.map((item, indice) => (
              <Revelar key={item.id} atraso={(indice % 5) * 55}>
                <button
                  type="button"
                  ref={(no) => {
                    gatilhos.current[indice] = no;
                  }}
                  onClick={() => setAberta(indice)}
                  aria-label={`${item.tipo === "video" ? "Assistir vídeo" : "Ampliar foto"}: ${descricao(item)}`}
                  className="placa group relative block aspect-[3/4] w-full cursor-zoom-in transition-transform duration-300 ease-[var(--ease-saida)] active:scale-[0.985]"
                >
                  {item.tipo === "foto" ? (
                    <Foto
                      foto={fotos[item.id]}
                      sizes="(min-width: 1024px) 19vw, (min-width: 768px) 24vw, 47vw"
                      preencher
                      posicao="center 45%"
                      className="transition-[transform,filter] duration-500 ease-[var(--ease-saida)] group-hover:scale-[1.05] group-hover:brightness-110"
                    />
                  ) : (
                    <>
                      <img
                        src={videos[item.id].poster}
                        width={videos[item.id].largura}
                        height={videos[item.id].altura}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-500 ease-[var(--ease-saida)] group-hover:scale-[1.05] group-hover:brightness-110"
                      />
                      <span
                        aria-hidden
                        className="absolute bottom-3 left-3 z-[2] inline-flex size-10 items-center justify-center rounded-full bg-breu/70 text-texto backdrop-blur-sm"
                      >
                        <Play size={18} weight="fill" />
                      </span>
                    </>
                  )}
                </button>
              </Revelar>
            ))}
          </div>
        </div>
      </div>

      {itemAtual && aberta !== null && (
        <div
          className="lightbox fixed inset-0 z-[70] flex items-center justify-center bg-breu/95 p-4 backdrop-blur-md sm:p-8"
          onClick={fechar}
        >
          <div
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-label={`Item ${aberta + 1} de ${ordem.length}: ${descricao(itemAtual)}`}
            tabIndex={-1}
            onClick={(evento) => evento.stopPropagation()}
            className="lightbox-painel relative flex max-h-full w-full max-w-[min(92vw,44rem)] flex-col items-center gap-4 outline-none"
          >
            {itemAtual.tipo === "foto" ? (
              <img
                key={itemAtual.id}
                src={fotos[itemAtual.id].src}
                srcSet={fotos[itemAtual.id].srcSet}
                sizes="(min-width: 640px) 44rem, 92vw"
                width={fotos[itemAtual.id].largura}
                height={fotos[itemAtual.id].altura}
                alt={fotos[itemAtual.id].alt}
                className="lightbox-midia max-h-[74vh] w-auto rounded-xl object-contain shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]"
              />
            ) : (
              <video
                key={itemAtual.id}
                src={videos[itemAtual.id].src}
                poster={videos[itemAtual.id].poster}
                width={videos[itemAtual.id].largura}
                height={videos[itemAtual.id].altura}
                aria-label={videos[itemAtual.id].descricao}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="lightbox-midia max-h-[74vh] w-auto rounded-xl bg-breu shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]"
              />
            )}

            <p className="max-w-[60ch] text-center text-sm leading-relaxed text-suave">
              {descricao(itemAtual)}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Item anterior"
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
                aria-label="Próximo item"
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
