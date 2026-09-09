"use client";

import { useEffect, useRef, useState } from "react";
import { List, WhatsappLogo, X } from "@phosphor-icons/react/dist/ssr";
import { navegacao, site, whatsappGeral } from "@/lib/site";
import { Botao } from "./Botao";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const sentinela = useRef<HTMLDivElement>(null);

  // O fundo do cabeçalho aparece depois dos primeiros pixels de rolagem.
  // Um sentinela observado evita qualquer listener de scroll.
  useEffect(() => {
    const alvo = sentinela.current;
    if (!alvo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setRolou(!entrada.isIntersecting),
      { threshold: 0 },
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  // Trava a rolagem do fundo enquanto o menu está aberto e fecha no Escape.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <>
      <div ref={sentinela} aria-hidden className="absolute top-0 h-px w-px" />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-marca focus:px-5 focus:py-2.5 focus:font-semibold focus:text-breu"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-saida)] ${
          rolou || aberto
            ? "border-b border-linha bg-breu/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
          <a
            href="#inicio"
            className="flex shrink-0 items-center gap-3 rounded-lg"
            aria-label={`${site.nome}, ir para o início`}
          >
            <img
              src="/logo.png"
              alt=""
              width={640}
              height={626}
              className="h-9 w-auto md:h-10"
            />
            <span className="hidden text-[0.8125rem] leading-tight font-semibold tracking-[0.02em] text-texto sm:block">
              KS Estética
              <span className="block text-[0.6875rem] font-normal tracking-[0.16em] text-suave uppercase">
                Automotiva
              </span>
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-[0.9375rem] text-suave transition-colors duration-200 hover:bg-superficie hover:text-texto"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Um wrapper controla a visibilidade: aplicar `hidden` direto no
                botão brigaria com o `inline-flex` das classes base. */}
            <div className="hidden sm:block">
              <Botao
                href={whatsappGeral}
                externo
                aria-label="Chamar a KS Estética Automotiva no WhatsApp"
              >
                <WhatsappLogo size={20} weight="fill" aria-hidden />
                Chamar no WhatsApp
              </Botao>
            </div>

            <a
              href={whatsappGeral}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar a KS Estética Automotiva no WhatsApp"
              className="inline-flex size-11 items-center justify-center rounded-full bg-marca text-breu transition-transform duration-150 ease-[var(--ease-saida)] active:scale-[0.94] sm:hidden"
            >
              <WhatsappLogo size={23} weight="fill" aria-hidden />
            </a>

            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-linha-forte text-texto transition-[transform,border-color] duration-150 ease-[var(--ease-saida)] hover:border-marca active:scale-[0.94] lg:hidden"
            >
              {aberto ? <X size={21} weight="bold" /> : <List size={21} weight="bold" />}
            </button>
          </div>
        </div>

        <div
          id="menu-mobile"
          hidden={!aberto}
          className="border-t border-linha bg-breu/97 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Navegação principal (celular)" className="px-5 py-3">
            <ul className="divide-y divide-linha">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block py-4 text-lg text-texto"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
