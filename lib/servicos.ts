import type { FotoId } from "./fotos";
import type { VideoId } from "./videos";

export type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  foto: FotoId;
  /** Quando existe, o card mostra o vídeo (com a foto como alternativa). */
  video?: VideoId;
  /** Como o serviço aparece na mensagem pré-preenchida do WhatsApp. */
  termoOrcamento: string;
  /** Colunas na grade de 6 colunas (desktop): 4+2 / 2+2+2 / 2+2+2. */
  colunas: 4 | 3 | 2;
  /** O primeiro card abre a grade em proporção mais larga. */
  destaque?: boolean;
};

export const servicos: Servico[] = [
  {
    id: "lavagem-completa",
    titulo: "Lavagem completa interna e externa",
    descricao:
      "Limpeza completa para renovar a aparência do veículo por dentro e por fora.",
    foto: "lavagem-completa-2",
    video: "lavagem-completa",
    termoOrcamento: "lavagem completa interna e externa",
    colunas: 4,
    destaque: true,
  },
  {
    id: "higienizacao-interna",
    titulo: "Higienização interna",
    descricao: "Cuidado profundo com o interior para mais conforto e bem-estar.",
    foto: "higienizacao-interna-1",
    video: "higienizacao-interna",
    termoOrcamento: "higienização interna",
    colunas: 2,
  },
  {
    id: "cristalizacao-vidro",
    titulo: "Cristalização de vidro",
    descricao: "Mais visibilidade e proteção para os vidros do seu veículo.",
    foto: "cristalizacao-vidro-3",
    termoOrcamento: "cristalização de vidro",
    colunas: 2,
  },
  {
    id: "lavagem-motor",
    titulo: "Lavagem de motor",
    descricao: "Limpeza detalhada do cofre do motor com atenção e cuidado.",
    foto: "lavagem-motor-1",
    termoOrcamento: "lavagem de motor",
    colunas: 2,
  },
  {
    id: "lavagem-chassi",
    titulo: "Lavagem de chassi",
    descricao: "Tratamento para as áreas inferiores do veículo.",
    foto: "lavagem-chassi-1",
    termoOrcamento: "lavagem de chassi",
    colunas: 2,
  },
  {
    id: "motocicletas",
    titulo: "Lavagem detalhada de motocicletas",
    descricao: "Cuidado especial para cada parte da sua moto.",
    foto: "motocicletas-4",
    video: "moto-estudio",
    termoOrcamento: "lavagem detalhada de motocicleta",
    colunas: 2,
  },
  {
    id: "caminhoes-guinchos",
    titulo: "Lavagens de caminhões e guinchos",
    descricao: "Soluções de limpeza para veículos de maior porte.",
    foto: "caminhoes-guinchos-1",
    termoOrcamento: "lavagem de caminhão ou guincho",
    colunas: 2,
  },
  {
    id: "carro-antigo",
    titulo: "Limpeza de carros antigos",
    descricao: "Cuidado com cada detalhe de veículos antigos e clássicos.",
    foto: "carro-antigo-1",
    video: "carro-antigo",
    termoOrcamento: "limpeza de carro antigo",
    colunas: 2,
  },
];
