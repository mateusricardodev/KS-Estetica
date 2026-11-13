import {
  ArrowUpRight,
  InstagramLogo,
  MapPin,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { linkMaps, site, whatsappGeral } from "@/lib/site";
import { Botao } from "./Botao";
import { MapaEmbutido } from "./MapaEmbutido";
import { Revelar } from "./Revelar";

const linkContato =
  "inline-block text-lg font-semibold text-texto underline decoration-marca/40 " +
  "transition-colors duration-200 hover:text-marca";

export function Localizacao() {
  return (
    <section
      id="localizacao"
      className="relative scroll-mt-20 bg-breu-2 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Revelar className="lg:col-span-5">
            <h2 className="passada display text-[clamp(2rem,4.6vw,3.5rem)] text-texto">
              Onde estamos
            </h2>

            <dl className="mt-10 divide-y divide-linha border-y border-linha">
              <div className="flex gap-4 py-6">
                <MapPin
                  size={22}
                  weight="fill"
                  aria-hidden
                  className="mt-1 shrink-0 text-marca"
                />
                <div>
                  <dt className="text-sm font-medium text-suave">Endereço</dt>
                  <dd className="mt-2">
                    <address className="text-lg leading-relaxed text-texto not-italic">
                      {site.endereco.rua}
                      <br />
                      {site.endereco.bairro}
                      <br />
                      {site.endereco.cidade}/{site.endereco.estado}
                    </address>
                    <Botao
                      href={linkMaps}
                      externo
                      variante="secundario"
                      className="mt-5"
                    >
                      Abrir no Google Maps
                      <ArrowUpRight size={17} weight="bold" aria-hidden />
                    </Botao>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 py-6">
                <WhatsappLogo
                  size={22}
                  weight="fill"
                  aria-hidden
                  className="mt-1 shrink-0 text-marca"
                />
                <div>
                  <dt className="text-sm font-medium text-suave">WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={whatsappGeral}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkContato}
                    >
                      {site.whatsapp.numeroExibicao}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 py-6">
                <InstagramLogo
                  size={22}
                  weight="fill"
                  aria-hidden
                  className="mt-1 shrink-0 text-marca"
                />
                <div className="min-w-0">
                  <dt className="text-sm font-medium text-suave">Instagram</dt>
                  <dd className="mt-2">
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkContato} break-words`}
                    >
                      {site.instagram.usuario}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Revelar>

          <Revelar atraso={120} className="lg:col-span-7">
            <div className="placa h-full min-h-[22rem] lg:min-h-[30rem]">
              <MapaEmbutido />
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
