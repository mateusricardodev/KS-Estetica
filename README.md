# KS Estética Automotiva

Landing page da KS Estética Automotiva, em São José dos Campos/SP.
Objetivo único da página: gerar contato e pedido de orçamento pelo WhatsApp.

Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + TypeScript.

## Rodar o projeto

Precisa de Node.js 18.18 ou mais novo.

```bash
npm install
```

Ambiente de desenvolvimento em http://localhost:3000:

```bash
npm run dev
```

Build de produção e execução local:

```bash
npm run build && npm run start
```

## Publicar

A página é 100% estática. Funciona em qualquer host.

- **Vercel**: importar o repositório e publicar, sem configuração extra.
- **Netlify / Cloudflare Pages**: comando `npm run build`, pasta `.next`.
- **Host estático simples** (GitHub Pages, Hostinger, etc.): adicione
  `output: "export"` no `next.config.mjs`, rode `npm run build` e publique a
  pasta `out/`. As fotos já são servidas direto, sem servidor de imagens, então
  nada quebra nesse modo.

Antes de publicar, troque `site.url` em `lib/site.ts` pelo domínio real. Esse
valor alimenta a tag canonical, o Open Graph e o `sitemap.xml`.

## Onde mexer

Quase toda alteração de conteúdo acontece em três arquivos:

| Arquivo | O que controla |
| --- | --- |
| `lib/site.ts` | Nome, slogan, WhatsApp, Instagram, endereço, links do menu e as mensagens pré-preenchidas do WhatsApp |
| `lib/servicos.ts` | Os sete serviços: título, descrição, foto, tamanho na grade e o termo que entra na mensagem do WhatsApp |
| `lib/fotos.ts` | Catálogo de fotos com texto alternativo, dimensões e placeholder. Gerado a partir das fotos originais |

### Trocar o número do WhatsApp

Em `lib/site.ts`, no bloco `whatsapp`. O campo `base` usa o formato
`https://wa.me/55DDNUMERO`, sem símbolos. Todos os botões da página derivam dele.

### Trocar a cor de destaque

A paleta saiu do próprio logo: fundo azul-petróleo quase preto, traço cromado e
o azul elétrico do risco de velocidade. Para mudar o destaque na página inteira,
altere três variáveis em `app/globals.css`, dentro do bloco `@theme`:

```css
--color-marca: #22c9e8;        /* preenchimento dos botões e ícones */
--color-marca-forte: #0fb4d6;  /* estado pressionado */
--color-brilho: #6fe6ff;       /* hover e anel de foco */
```

Se preferir a marca em vermelho, um conjunto que mantém o contraste mínimo
exigido (texto quase preto sobre o botão) é `#e8362f`, `#c62a24` e `#ff5a52`.

### Adicionar fotos

1. Coloque os arquivos otimizados em `public/fotos/`, seguindo o padrão de nome
   `nome-do-servico-N-LARGURA.webp` (larguras 360, 540 e a original).
2. Acrescente a entrada correspondente em `lib/fotos.ts`, com `alt` descritivo.
3. Referencie o novo `id` em `lib/servicos.ts` ou na lista `ordem` de
   `components/Galeria.tsx`.

## Estrutura

```
app/
  layout.tsx      Metadados, SEO, Open Graph, dados estruturados LocalBusiness
  page.tsx        Montagem das seções
  globals.css     Tokens de cor, tipografia e as animações da página
  icon.png        Favicon e ícone de aplicativo
components/
  Cabecalho.tsx   Header fixo, menu compacto no celular, WhatsApp sempre visível
  Hero.tsx        Primeira dobra
  Apresentacao.tsx
  Servicos.tsx    Grade assimétrica de 7 cards, cada um com CTA próprio
  Galeria.tsx     Grade de 15 fotos com lightbox acessível
  ChamadaFinal.tsx
  Localizacao.tsx Endereço, contatos e mapa sob demanda
  Rodape.tsx
  BotaoFlutuante.tsx
  Foto.tsx        Imagem responsiva com srcset, placeholder e altura reservada
  Botao.tsx       Botão/link nas três variantes da marca
  Revelar.tsx     Revelação na rolagem via IntersectionObserver
lib/
  site.ts  servicos.ts  fotos.ts
docs/
  PRODUCT.md  DESIGN.md
```

## Decisões que valem saber

**Fotos.** As 17 imagens originais viraram 45 arquivos WebP em três larguras,
de 22 MB para 3,8 MB. Cada foto carrega um placeholder borrado embutido e tem
largura e altura declaradas, então a página não pula durante o carregamento.
Não há imagem de banco: tudo é material real da empresa.

**Duas fotos ficaram de fora.** Uma é uma arte promocional com preço e condição
de pagamento, que contraria a regra de não exibir valores. A outra mostra um
veículo ainda sujo, que não representa resultado. Os arquivos originais seguem
disponíveis caso você queira usá-las.

**Mapa sob demanda.** O mapa do Google só carrega quando a pessoa clica. Isso
evita quase 1 MB de scripts de terceiros no primeiro acesso, que é o cenário
mais comum: celular, rede móvel.

**Movimento contido.** A página tem um único momento autoral, a abertura, e
revelações discretas na rolagem. Sem carrossel automático e sem laço infinito.
Tudo desliga sozinho em `prefers-reduced-motion`.

**Nada foi inventado.** Não há preço, avaliação, tempo de mercado, certificação,
garantia nem horário de funcionamento na página ou nos dados estruturados,
porque nada disso foi informado.

## Acessibilidade

- Contraste do texto corrido em 8,8:1 e dos títulos em 17,8:1, acima do exigido
  pela WCAG AA.
- Foco visível com anel próprio em todos os elementos interativos.
- Link "Pular para o conteúdo" no início da página.
- Lightbox com Escape, setas do teclado e devolução do foco à miniatura.
- Nenhuma informação depende só de cor. Todo ícone vem acompanhado de texto ou
  de rótulo acessível.
- Texto alternativo descritivo em todas as fotos.
