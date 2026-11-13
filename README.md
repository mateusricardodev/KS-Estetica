# KS Estética Automotiva

> **Muito além de uma lavagem, cuidamos do seu sonho.**

Landing page institucional da **KS Estética Automotiva**, criada para transformar visitas em conversas no WhatsApp. O projeto une uma experiência visual automotiva premium a uma navegação leve, rápida e acessível — com conteúdo, fotos e CTAs pensados para clientes de São José dos Campos/SP.

![Next.js](https://img.shields.io/badge/Next.js-15-111111?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

## O projeto

O site foi desenhado para apresentar os serviços reais da estética, valorizar o resultado visual do trabalho e encurtar o caminho até o orçamento. Não há preços, promessas ou informações comerciais inventadas: cada chamada direciona o visitante para um contato direto e contextualizado pelo WhatsApp.

**Acesse:** [repositório no GitHub](https://github.com/mateusricardodev/KS-Estetica) · [Instagram da KS Estética](https://www.instagram.com/ks.estetica_automotiva012?igsh=MTg5Mm53MGJsenZnMg%3D%3D) · [Falar no WhatsApp](https://wa.me/5512988306402)

## Destaques

- Experiência responsiva, pensada primeiro para celular.
- Header fixo, menu compacto e botão flutuante de WhatsApp.
- CTAs com mensagens pré-preenchidas por serviço.
- Grade assimétrica para os oito serviços da empresa, quatro deles com vídeo real.
- Galeria com 19 fotos e 1 vídeo reais, e lightbox navegável por teclado.
- Imagens WebP responsivas, com `srcset`, placeholder e dimensões reservadas para evitar saltos de layout.
- Mapa carregado apenas sob demanda, reduzindo scripts de terceiros no primeiro acesso.
- SEO completo: metadados, Open Graph, canonical, sitemap e dados estruturados `LocalBusiness`.
- Movimento com linguagem automotiva (reflexo de pintura, passada, friso cromado) e respeito a `prefers-reduced-motion`.
- Boas práticas de acessibilidade, incluindo foco visível, skip link, contraste alto e textos alternativos descritivos.

## Serviços apresentados

| Serviço | Descrição |
| --- | --- |
| Lavagem completa interna e externa | Renovação completa da aparência do veículo. |
| Higienização interna | Cuidado profundo para mais conforto no interior. |
| Cristalização de vidro | Proteção e mais visibilidade para os vidros. |
| Lavagem de motor | Limpeza detalhada do cofre do motor. |
| Lavagem de chassi | Atenção às áreas inferiores do veículo. |
| Lavagem detalhada de motocicletas | Cuidado especial em cada parte da moto. |
| Lavagem de caminhões e guinchos | Soluções para veículos de maior porte. |

## Tecnologias

- [Next.js 15](https://nextjs.org/) com App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)

## Começar localmente

Pré-requisito: Node.js **18.18+**.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para validar a versão de produção:

```bash
npm run build
npm run start
```

## Estrutura do projeto

```text
app/
├── layout.tsx          # Metadados, SEO, Open Graph e LocalBusiness
├── page.tsx            # Composição das seções da landing page
└── globals.css         # Tokens, tipografia e animações

components/
├── Cabecalho.tsx       # Navegação fixa e menu mobile
├── Hero.tsx            # Primeira dobra e CTAs principais
├── Servicos.tsx        # Cards de serviços com orçamento contextualizado
├── VideoAoVivo.tsx     # Vídeo mudo que só toca quando está visível
├── Galeria.tsx         # Galeria de fotos e vídeo com lightbox acessível
├── Localizacao.tsx     # Contatos e mapa sob demanda
├── BotaoFlutuante.tsx  # CTA persistente para o WhatsApp
└── ...

lib/
├── site.ts             # Dados institucionais e links globais
├── servicos.ts         # Serviços, textos, fotos e CTAs
└── fotos.ts            # Catálogo de imagens e descrições alternativas

public/
└── fotos/              # Imagens otimizadas em múltiplas larguras

docs/
├── PRODUCT.md          # Decisões de produto
└── DESIGN.md           # Direção visual e sistema de design
