import type { ReactNode } from "react";

type Variante = "primario" | "secundario" | "discreto";
type Tamanho = "medio" | "grande";

type Props = {
  href: string;
  children: ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  /** Links externos abrem em nova aba com rel de segurança. */
  externo?: boolean;
  className?: string;
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-saida)] " +
  "active:scale-[0.97] active:duration-100";

const variantes: Record<Variante, string> = {
  // Preenchimento da marca com texto quase preto: 9.9:1 de contraste.
  primario:
    "bg-marca text-breu hover:bg-brilho shadow-[0_10px_30px_-14px_rgba(34,201,232,0.7)]",
  // Contorno cromado sobre o fundo escuro.
  secundario:
    "border border-linha-forte bg-superficie/70 text-texto hover:border-marca hover:bg-superficie-2",
  discreto: "text-marca hover:text-brilho underline decoration-marca/40",
};

const tamanhos: Record<Tamanho, string> = {
  medio: "px-5 py-2.5 text-[0.9375rem]",
  grande: "px-7 py-4 text-base sm:text-lg",
};

export function Botao({
  href,
  children,
  variante = "primario",
  tamanho = "medio",
  externo = false,
  className = "",
  ...resto
}: Props) {
  const externoProps = externo
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho]} ${className}`}
      {...externoProps}
      {...resto}
    >
      {children}
    </a>
  );
}
