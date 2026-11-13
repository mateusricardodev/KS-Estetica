import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { fotos } from "@/lib/fotos";
import { site, whatsappGeral } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

/**
 * O único trecho da página em que a cor da marca ocupa a região inteira.
 * O fundo é a lataria polida sob um campo azul profundo, para o texto branco
 * manter contraste alto sem perder a força da cor.
 */
export function ChamadaFinal() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Foto
          foto={fotos["lavagem-completa-1"]}
          sizes="100vw"
          posicao="55% 40%"
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#04222c_0%,#062a38_36%,#05121d_72%,#05070e_100%)] opacity-[0.94]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_12%_0%,rgba(34,201,232,0.26)_0%,transparent_62%)]" />
      </div>

      {/* Um único reflexo largo atravessa a seção quando ela chega. */}
      <Revelar className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div aria-hidden className="reflexo-largo absolute inset-0" />
        <div aria-hidden className="farol farol-esq" />
        <div aria-hidden className="farol farol-dir" />
      </Revelar>

      <div aria-hidden className="fio-cromado absolute inset-x-0 top-0" />
      <div aria-hidden className="fio-cromado absolute inset-x-0 bottom-0" />

      <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-8 sm:py-32">
        <Revelar className="max-w-[42rem]">
          <h2 className="passada display text-[clamp(2.25rem,5.4vw,4rem)] text-texto">
            Seu veículo merece esse cuidado.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-texto/85 sm:text-xl">
            Fale com a {site.nome} e solicite seu orçamento.
          </p>

          <div className="mt-10">
            <Botao href={whatsappGeral} externo tamanho="grande">
              <WhatsappLogo size={24} weight="fill" aria-hidden />
              Falar pelo WhatsApp
            </Botao>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
