import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { navegacao, site, whatsappGeral } from "@/lib/site";

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative bg-breu pt-16 pb-10">
      <div aria-hidden className="fio-cromado absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <img
              src="/logo.png"
              alt=""
              width={640}
              height={626}
              className="h-14 w-auto"
              loading="lazy"
            />
            <p className="display-menor mt-5 text-xl text-texto">{site.nome}</p>
            <p className="mt-3 max-w-[36ch] leading-relaxed text-suave">
              Muito além de uma lavagem, cuidamos do seu sonho! ✨
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <h2 className="text-sm font-medium text-suave">Navegar</h2>
            <ul className="mt-4 space-y-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-texto transition-colors duration-200 hover:text-marca"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-medium text-suave">Contato</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={whatsappGeral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold text-texto transition-colors duration-200 hover:text-marca"
                >
                  <WhatsappLogo
                    size={20}
                    weight="fill"
                    aria-hidden
                    className="text-marca"
                  />
                  {site.whatsapp.numeroExibicao}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold break-all text-texto transition-colors duration-200 hover:text-marca"
                >
                  <InstagramLogo
                    size={20}
                    weight="fill"
                    aria-hidden
                    className="shrink-0 text-marca"
                  />
                  {site.instagram.usuario}
                </a>
              </li>
              <li>
                <address className="leading-relaxed text-suave not-italic">
                  {site.endereco.rua}
                  <br />
                  {site.endereco.bairro}
                  <br />
                  {site.endereco.cidade}/{site.endereco.estado}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-linha pt-8 text-sm text-suave">
          © {ano} {site.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
