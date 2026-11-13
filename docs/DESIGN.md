# Sistema visual

Documenta o que foi construído. Vale para qualquer peça nova da marca no digital.

## Origem

A paleta e o registro tipográfico saíram do logo, não de uma escolha de gosto.
O logo é um traço cromado sobre um fundo azul-petróleo quase preto, cortado por
um risco de velocidade em azul elétrico. A página inteira é essa leitura:
o preto azulado como campo, o cromado como aresta e o azul elétrico como o
único acento.

O briefing previa vermelho como alternativa **caso a leitura do logo não fosse
suficiente**. Ela foi. O vermelho continua trocável em três variáveis
(ver README), mas a página nasceu com a cor que a marca já tem.

## Cor

Tokens em `app/globals.css`, bloco `@theme`.

| Token | Valor | Papel |
| --- | --- | --- |
| `--color-breu` | `#05070e` | Campo base. Preto azulado, nunca preto puro |
| `--color-breu-2` | `#080c15` | Faixa alternada entre seções |
| `--color-superficie` | `#0e1522` | Cards e painéis |
| `--color-superficie-2` | `#141d2d` | Estado ativo de painel |
| `--color-linha` | `#1b2637` | Fio de separação |
| `--color-linha-forte` | `#2b3a52` | Contorno de controle |
| `--color-texto` | `#f2f6fb` | Texto principal, 17,8:1 sobre o base |
| `--color-suave` | `#9fb0c6` | Texto secundário, 8,9:1. Tingido do azul, nunca cinza neutro |
| `--color-marca` | `#22c9e8` | Acento único. 9,9:1 sobre o base |
| `--color-marca-forte` | `#0fb4d6` | Pressionado |
| `--color-brilho` | `#6fe6ff` | Hover e anel de foco |
| `--color-cromado` | `#c9d6e6` | Reflexo das arestas e fios |

**Estratégia de cor: contida.** Neutros mais um acento. A cor da marca ocupa
uma região inteira em um único ponto da página, a chamada final, onde o campo
azul profundo sustenta texto branco com contraste alto. Em nenhum outro lugar
ela é fundo.

**Tema travado em escuro.** A cena de uso decidiu: a pessoa abre o site do
celular, com o carro sujo, antes ou depois do expediente. O escuro é onde a
lataria polida aparece. Nenhuma seção inverte.

## Tipografia

**Archivo variável**, uma única família em duas larguras. Sem fonte de sistema
e sem par de famílias diferentes.

- **Display** (`.display`): `wdth 112`, peso 700, entrelinha 0.98,
  tracking -0.035em. O registro industrial que combina com o traço do logo.
- **Display menor** (`.display-menor`): `wdth 108`, peso 700, entrelinha 1.05.
  Títulos de card.
- **Corpo**: Archivo em largura normal, entrelinha relaxada, medida entre
  46 e 65 caracteres.

Escala do título principal: `clamp(2.25rem, 6.6vw, 4.75rem)`. O teto de 4,75rem
existe para o título caber em **duas linhas** em qualquer largura, do celular
de 320px ao desktop de 1440px. Alterar a escala exige remedir.

Ênfase acontece por peso, tamanho ou cor de um único glifo (o ponto final do
título é o acento da marca). Nunca por gradiente no texto nem por troca de
família dentro da frase.

## Forma e profundidade

- **Um só raio de canto**: 14px em placas e cards, pílula completa em controles.
- **Placa** (`.placa`): moldura escura com luz alta de 1px na borda superior e
  sombra deslocada com desfoque largo. É a quina de uma lataria polida, não um
  halo colorido.
- **Fio cromado** (`.fio-cromado`): 1px em gradiente horizontal que abre e
  fecha as seções fortes. É o reflexo discreto pedido no briefing.
- Sem vidro fosco decorativo. O `backdrop-blur` aparece em dois lugares onde há
  conteúdo real atrás: o cabeçalho ao rolar e o fundo do lightbox.

## Movimento

Linguagem automotiva, cada efeito com um motivo e nenhum em loop:

- **Reflexo de pintura**: uma faixa de luz atravessa a mídia de cada card uma
  vez, quando ele entra na tela. Diz "isto está brilhando" sem texto.
- **Passada**: os títulos de seção são revelados da esquerda para a direita,
  como um carro cruzando o quadro.
- **Friso cromado**: o fio entre seções se estende ao entrar na tela, onde o
  navegador suporta animação guiada por rolagem.
- **Risco de velocidade**: as três ondas do logo se desenham uma vez sob o
  título principal.
- **Vídeos**: nunca tocam sozinhos. Os cards mostram a foto parada; quem quiser
  vê o vídeo pelo botão "Ver vídeo", num painel na própria página, com o pedido
  de orçamento logo abaixo.


Intensidade baixa por decisão de briefing. Um momento autoral, e só.

- **Abertura**: o texto do hero sobe uma vez, escalonado a cada 90ms, e uma luz
  atravessa a placa da moto uma única vez. Não se repete.
- **Rolagem**: revelação por `IntersectionObserver`, opacidade mais 14px de
  deslocamento, 620ms. Dispara uma vez por elemento. Nenhum listener de scroll
  na página inteira.
- **Curvas**: `cubic-bezier(0.23, 1, 0.32, 1)` para entrada e saída,
  `cubic-bezier(0.32, 0.72, 0, 1)` para deslocamento. Nunca `ease-in`.
- **Controles**: `scale(0.97)` em `:active`, 150ms. Todo elemento pressionável
  responde ao toque.
- **Duração**: nada acima de 300ms em elemento de interface.
- Só `transform`, `opacity` e `filter` são animados.
- Tudo dentro de `prefers-reduced-motion: no-preference`. Com movimento
  reduzido a página é estática e o conteúdo continua visível: o estado padrão
  do `.revelar` é opacidade 1, então nada some se o JavaScript falhar.

## Composição

Sete famílias de layout, nenhuma repetida:

1. **Hero**: divisão assimétrica, texto à esquerda e uma placa vertical à
   direita. As fotos reais são 9:16, então o formato virou moldura em vez de
   ser cortado para caber num banner.
2. **Apresentação**: declaração larga seguida de uma faixa de três recortes de
   detalhe (pintura, vidro, motor).
3. **Serviços**: grade assimétrica de 6 colunas que fecha exata,
   4+2 / 2+2+2 / 2+2+2. Oito itens, oito células, nenhuma vazia. A mídia de cada
   card absorve a sobra de altura da linha.
4. **Galeria**: 20 itens em grade fechada de 5, 4 e 2 colunas.
5. **Chamada final**: campo de cor ocupando a região inteira.
6. **Localização**: divisão de lista e mapa.
7. **Rodapé**: três colunas.

Contêiner de 1320px. Espaçamento de seção `py-20` no celular e `py-28` acima,
sempre com mais ar acima de um título do que abaixo.

Sem rótulo em versalete acima de título. O título se sustenta sozinho.

## Superfícies do navegador

Seleção de texto, cursor de digitação, barra de rolagem, anel de foco e o
deslocamento do sublinhado são temáticos, definidos em `@layer base`. São a
parte da página que o navegador desenharia sozinho, e ela também pertence ao
projeto.

## Ícones

Phosphor Icons, peso `fill` para marcas (WhatsApp, Instagram, alfinete de mapa)
e `bold` para setas e controles. Uma família só, nenhum SVG desenhado à mão,
nenhum emoji no lugar de ícone.

O emoji aparece exatamente uma vez na página, no rodapé, porque faz parte do
slogan escrito pela própria empresa.

## Limites

Não existe na página, por falta de dado confirmado: preço, avaliação, depoimento,
tempo de mercado, certificação, garantia e horário de funcionamento. Os dados
estruturados seguem a mesma regra. Se a empresa fornecer horários, o lugar de
declará-los é `openingHoursSpecification` no bloco de `app/layout.tsx`.
