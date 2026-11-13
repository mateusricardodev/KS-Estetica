// Vídeos reais da KS Estética Automotiva, convertidos para MP4 H.264 sem áudio.
// Todos são verticais (320 x 568). O poster é um quadro do próprio vídeo.

export type Video = {
  id: string;
  src: string;
  poster: string;
  largura: number;
  altura: number;
  /** Descrição do que acontece no vídeo, lida por leitores de tela. */
  descricao: string;
};

const v = (id: string, descricao: string): Video => ({
  id,
  src: `/videos/${id}.mp4`,
  poster: `/videos/${id}.jpg`,
  largura: 320,
  altura: 568,
  descricao,
});

export const videos = {
  "carro-antigo": v("carro-antigo", "Opala cupê dourado depois da limpeza, filmado de trás para a frente"),
  "lavagem-completa": v("lavagem-completa", "Hatch preto recém-lavado, com reflexos na pintura e rodas limpas"),
  "moto-estudio": v("moto-estudio", "Moto esportiva azul no estúdio da KS, iluminado por faixas de luz, terminando na placa da loja"),
  "higienizacao-interna": v("higienizacao-interna", "Bancos, painel e teto de um carro depois da higienização interna"),
  "lavagem-celta": v("lavagem-celta", "Hatch vermelho lavado em frente à loja da KS"),
  "lavagem-suv": v("lavagem-suv", "SUV branco lavado em frente à loja da KS"),
  "lavagem-corsa": v("lavagem-corsa", "Sedã verde-escuro lavado, com a pintura refletindo a rua"),
} as const satisfies Record<string, Video>;

export type VideoId = keyof typeof videos;
