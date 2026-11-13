import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappGeral } from "@/lib/site";

/**
 * Atalho permanente para o WhatsApp, em todas as telas.
 * No desktop o rótulo aparece ao passar o mouse; no celular o alvo tem 60px,
 * bem acima do mínimo de 44px recomendado para toque.
 */
export function BotaoFlutuante() {
  return (
    <a
      href={whatsappGeral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a KS Estética Automotiva no WhatsApp"
      className="anel-unico group fixed right-4 bottom-4 z-40 inline-flex h-[60px] items-center gap-3 rounded-full bg-marca px-[17px] text-breu shadow-[0_14px_38px_-12px_rgba(34,201,232,0.75)] transition-[transform,background-color] duration-200 ease-[var(--ease-saida)] hover:bg-brilho active:scale-[0.95] sm:right-6 sm:bottom-6 lg:pr-6 lg:pl-5"
    >
      <WhatsappLogo size={26} weight="fill" aria-hidden className="shrink-0" />
      <span className="hidden font-semibold whitespace-nowrap lg:inline">
        Falar no WhatsApp
      </span>
    </a>
  );
}
