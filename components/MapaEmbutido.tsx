"use client";

import { useState } from "react";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { mapaEmbed, site } from "@/lib/site";

/**
 * O mapa do Google só é carregado quando a pessoa pede.
 * Isso evita ~1 MB de scripts de terceiros no carregamento inicial e
 * mantém a página rápida no celular.
 */
export function MapaEmbutido() {
  const [carregado, setCarregado] = useState(false);

  if (carregado) {
    return (
      <iframe
        src={mapaEmbed}
        title={`Mapa com a localização da ${site.nome}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setCarregado(true)}
      className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-superficie px-6 py-14 text-center transition-colors duration-300 ease-[var(--ease-saida)] hover:bg-superficie-2"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-linha-forte text-marca transition-transform duration-200 ease-[var(--ease-saida)] group-active:scale-[0.94]">
        <MapPin size={26} weight="fill" aria-hidden />
      </span>
      <span className="text-lg font-semibold text-texto">
        Carregar o mapa
      </span>
      <span className="max-w-[34ch] text-sm leading-relaxed text-suave">
        O mapa do Google abre aqui dentro. Deixamos ele desligado para a página
        carregar rápido no celular.
      </span>
    </button>
  );
}
