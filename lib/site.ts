/**
 * Fonte única de verdade dos dados da empresa.
 * Alterar aqui reflete no site inteiro (header, cards, CTA, rodapé e dados estruturados).
 */

export const site = {
  nome: "KS Estética Automotiva",
  slogan: "Muito além de uma lavagem, cuidamos do seu sonho!",
  sloganCurto: "Muito além de uma lavagem.",
  resumo:
    "Estética automotiva em São José dos Campos. Lavagem, higienização e cuidado detalhado em carros, motos, caminhões e guinchos.",

  whatsapp: {
    numeroExibicao: "(12) 98830-6402",
    numeroInternacional: "+55 12 98830-6402",
    e164: "+5512988306402",
    base: "https://wa.me/5512988306402",
  },

  instagram: {
    usuario: "@ks.estetica_automotiva012",
    url: "https://www.instagram.com/ks.estetica_automotiva012?igsh=MTg5Mm53MGJsenZnMg%3D%3D",
  },

  endereco: {
    rua: "Rua Joaquim Batista de Carvalho, 143",
    bairro: "Zona Leste (Santa Inês 1)",
    cidade: "São José dos Campos",
    estado: "SP",
    pais: "BR",
    completo:
      "Rua Joaquim Batista de Carvalho, 143, Zona Leste (Santa Inês 1), São José dos Campos, SP",
  },

  /** Trocar pelo domínio real na publicação. Usado em canonical, OG e sitemap. */
  url: "https://ksesteticaautomotiva.com.br",
} as const;

/** Monta um link do WhatsApp com mensagem pré-preenchida. */
export function linkWhatsApp(mensagem: string): string {
  return `${site.whatsapp.base}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagens = {
  geral:
    "Olá! Vim pelo site da KS Estética Automotiva e gostaria de solicitar um orçamento.",
  servico: (servico: string) =>
    `Olá! Vim pelo site da KS Estética Automotiva e gostaria de um orçamento para ${servico}.`,
} as const;

export const whatsappGeral = linkWhatsApp(mensagens.geral);

export const linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.endereco.completo,
)}`;

export const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  site.endereco.completo,
)}&output=embed&hl=pt-BR&z=16`;

export const navegacao = [
  { rotulo: "Início", href: "#inicio" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Galeria", href: "#galeria" },
  { rotulo: "Localização", href: "#localizacao" },
] as const;
