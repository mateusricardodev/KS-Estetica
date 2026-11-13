"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/lib/videos";

type Props = {
  video: Video;
  className?: string;
  /** Preenche o pai posicionado, como a Foto com `preencher`. */
  preencher?: boolean;
};

/**
 * Vídeo mudo que só toca enquanto está visível.
 * Fora da tela ele pausa, para não gastar bateria nem dados.
 * Nada é baixado antes de o vídeo chegar perto da tela (preload="none").
 * Com movimento reduzido, fica parado no poster.
 */
export function VideoAoVivo({ video, className = "", preencher = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.play().catch(() => {
            // Navegador bloqueou o autoplay: o poster continua visível.
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster}
      width={video.largura}
      height={video.altura}
      muted
      loop
      playsInline
      preload="none"
      aria-label={video.descricao}
      className={`h-full w-full object-cover ${preencher ? "absolute inset-0" : ""} ${className}`}
    />
  );
}
