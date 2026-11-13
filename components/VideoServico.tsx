"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Play, WhatsappLogo, X } from "@phosphor-icons/react/dist/ssr";
import type { Video } from "@/lib/videos";
import { Botao } from "./Botao";

type Props = {
  video: Video;
  titulo: string;
  descricao: string;
  linkOrcamento: string;
};

const NOME = "midia-servico";

/** Foto do card que contém o botão: é ela que "vira" o vídeo. */
function fotoDoCard(botao: HTMLElement | null) {
  return botao?.closest("article")?.querySelector<HTMLElement>("img") ?? null;
}

/** Usa View Transitions quando o navegador tem e o movimento não foi reduzido. */
function comTransicao(atualizar: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    atualizar();
    return null;
  }
  return doc.startViewTransition(atualizar);
}

/**
 * Botão "Ver vídeo" do card de serviço.
 * Abre um painel na própria página (sem trocar de aba) com o vídeo e,
 * logo abaixo, o pedido de orçamento pelo WhatsApp.
 */
export function VideoServico({ video, titulo, descricao, linkOrcamento }: Props) {
  const [aberto, setAberto] = useState(false);
  const gatilho = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  // A foto do card e o vídeo do painel compartilham o mesmo nome de
  // transição, mas nunca ao mesmo tempo: o nome passa de um para o outro
  // dentro da atualização, e o navegador interpola a caixa entre os dois.
  const abrir = () => {
    const foto = fotoDoCard(gatilho.current);
    if (foto) foto.style.viewTransitionName = NOME;
    comTransicao(() => {
      if (foto) foto.style.viewTransitionName = "";
      flushSync(() => setAberto(true));
    });
  };

  const fechar = () => {
    const foto = fotoDoCard(gatilho.current);
    const t = comTransicao(() => {
      flushSync(() => setAberto(false));
      if (foto) foto.style.viewTransitionName = NOME;
    });
    const limpar = () => {
      if (foto) foto.style.viewTransitionName = "";
    };
    if (t) t.finished.finally(limpar);
    else limpar();
  };

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painel.current?.focus();
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") fechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
      gatilho.current?.focus();
    };
    // `fechar` só lê refs; incluí-lo recriaria o listener a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  return (
    <>
      <button
        ref={gatilho}
        type="button"
        onClick={abrir}
        className="inline-flex items-center gap-2 rounded-full border border-linha-forte px-4 py-2.5 text-[0.9375rem] font-semibold text-texto transition-[transform,border-color,color] duration-150 ease-[var(--ease-saida)] hover:border-marca hover:text-marca active:scale-[0.97]"
      >
        <Play size={16} weight="fill" aria-hidden />
        Ver vídeo
      </button>

      {aberto && (
        <div
          className="lightbox fixed inset-0 z-[70] flex items-center justify-center bg-breu/95 p-4 backdrop-blur-md sm:p-8"
          onClick={fechar}
        >
          <div
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-label={`Vídeo: ${titulo}`}
            tabIndex={-1}
            onClick={(evento) => evento.stopPropagation()}
            className="lightbox-painel relative flex max-h-full w-full max-w-[24rem] flex-col items-center gap-5 outline-none"
          >
            <video
              src={video.src}
              poster={video.poster}
              width={video.largura}
              height={video.altura}
              aria-label={video.descricao}
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{ viewTransitionName: NOME }}
              className="max-h-[62vh] w-auto rounded-xl bg-breu shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]"
            />

            <div className="text-center">
              <h3 className="display-menor text-xl text-texto">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-suave">{descricao}</p>
            </div>

            <Botao href={linkOrcamento} externo>
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Pedir orçamento
            </Botao>

            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar vídeo"
              className="absolute -top-1 right-0 inline-flex size-11 -translate-y-full items-center justify-center rounded-full border border-linha-forte bg-superficie text-texto transition-[transform,border-color] duration-150 ease-[var(--ease-saida)] hover:border-marca active:scale-[0.94] sm:-top-3"
            >
              <X size={20} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
