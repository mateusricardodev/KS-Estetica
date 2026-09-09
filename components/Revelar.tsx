"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em ms para escalonar itens de uma mesma lista. Use passos de 60ms. */
  atraso?: number;
  className?: string;
  como?: ElementType;
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 * Usa IntersectionObserver (nunca listener de scroll), anima só opacity e
 * transform, dispara uma única vez e respeita prefers-reduced-motion pelo CSS.
 * O estado inicial visível garante que o conteúdo apareça mesmo sem JavaScript.
 */
export function Revelar({
  children,
  atraso = 0,
  className = "",
  como: Como = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    elemento.dataset.revelar = "aguardando";

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.revelar = "visivel";
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <Como
      ref={ref}
      className={`revelar ${className}`}
      style={atraso ? ({ "--atraso": `${atraso}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Como>
  );
}
