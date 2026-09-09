import { fotos } from "@/lib/fotos";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

/** Três recortes de detalhe: a pintura, o vidro e o motor. */
const detalhes = [
  fotos["lavagem-completa-2"],
  fotos["cristalizacao-vidro-3"],
  fotos["lavagem-motor-2"],
] as const;

export function Apresentacao() {
  return (
    <section className="relative bg-breu py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Revelar className="max-w-[52rem]">
          <h2 className="display text-[clamp(2rem,4.6vw,3.5rem)] text-texto">
            Cuidado que se vê em cada detalhe
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-suave">
            Seu veículo merece mais do que uma limpeza comum. Trabalhamos com
            atenção aos detalhes para entregar aparência renovada, sensação de
            cuidado e um resultado à altura do seu sonho.
          </p>
        </Revelar>
      </div>

      <Revelar atraso={120} className="mt-14 sm:mt-16">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {detalhes.map((foto) => (
              <div
                key={foto.id}
                className="placa h-[clamp(9rem,25vw,21rem)]"
              >
                <Foto
                  foto={foto}
                  sizes="(min-width: 1360px) 420px, 31vw"
                  posicao="center 45%"
                />
              </div>
            ))}
          </div>
        </div>
      </Revelar>
    </section>
  );
}
