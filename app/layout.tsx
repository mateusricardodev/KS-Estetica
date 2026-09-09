import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { servicos } from "@/lib/servicos";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo variável: uma só família em duas larguras.
// A largura expandida faz os títulos; a normal faz o texto corrido.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--fonte-archivo",
  display: "swap",
});

const titulo = `${site.nome} | Estética automotiva em ${site.endereco.cidade}`;
const descricao =
  "Lavagem completa, higienização interna, cristalização de vidro, lavagem de motor e chassi, motos, caminhões e guinchos em São José dos Campos. Peça seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titulo,
    template: `%s | ${site.nome}`,
  },
  description: descricao,
  keywords: [
    "estética automotiva",
    "lava jato São José dos Campos",
    "higienização interna",
    "cristalização de vidro",
    "lavagem de motor",
    "lavagem de chassi",
    "lavagem de moto",
    "lavagem de caminhão",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: titulo,
    description: descricao,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.nome}: muito além de uma lavagem`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070e",
  colorScheme: "dark",
};

/**
 * Dados estruturados. Só entram fatos confirmados pela empresa:
 * nome, contato, endereço, redes e a lista de serviços.
 * Sem preços, avaliações, horários ou tempo de mercado.
 */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  "@id": `${site.url}/#negocio`,
  name: site.nome,
  slogan: site.slogan,
  description: descricao,
  url: site.url,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/logo.png`,
  telephone: site.whatsapp.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.rua}`,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.estado,
    addressCountry: site.endereco.pais,
  },
  areaServed: {
    "@type": "City",
    name: site.endereco.cidade,
  },
  sameAs: [site.instagram.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: servicos.map((servico) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: servico.titulo,
        description: servico.descricao,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados),
          }}
        />
      </body>
    </html>
  );
}
