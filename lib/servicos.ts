import type { FotoId } from "./fotos";

export type Servico = {
  id: string;
  titulo: string;
  descricao: string;
  foto: FotoId;
  /** Como o serviço aparece na mensagem pré-preenchida do WhatsApp. */
  termoOrcamento: string;
  /** Colunas ocupadas na grade de 6 colunas (desktop). Somam 6 por linha. */
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
    termoOrcamento: "lavagem completa interna e externa",
    colunas: 4,
    destaque: true,
  },
  {
    id: "higienizacao-interna",
    titulo: "Higienização interna",
    descricao: "Cuidado profundo com o interior para mais conforto e bem-estar.",
    foto: "higienizacao-interna-1",
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
    termoOrcamento: "lavagem detalhada de motocicleta",
    colunas: 3,
  },
  {
    id: "caminhoes-guinchos",
    titulo: "Lavagens de caminhões e guinchos",
    descricao: "Soluções de limpeza para veículos de maior porte.",
    foto: "caminhoes-guinchos-1",
    termoOrcamento: "lavagem de caminhão ou guincho",
    colunas: 3,
  },
];
