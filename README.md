# framely — Ads & Motion (Remotion)

Anúncio vertical de 9,5 s para a **framely**, construído em Remotion. Toda escala, posição,
rotação, opacidade e traço é calculada com `spring()` usando uma única física:

```ts
spring({ frame, fps, config: { damping: 14, stiffness: 120, mass: 0.6 } })
```

| Especificação | Valor |
| --- | --- |
| Resolução | 1080 × 1920 (vertical) |
| FPS | 30 |
| Duração | 285 frames (9,5 s) |
| Fundo | `#FFFFFF` |

## Como rodar

```bash
npm install
npx remotion studio      # abre o Remotion Studio (composição "MainAd")
npm run render           # gera out/framely-ad.mp4
```

## Timeline (frames absolutos)

| Fase | Frames | Cena | O que acontece |
| --- | --- | --- | --- |
| 1 | 0–30 | `Scene1Pop` | Logo surge com pop elástico (duas molas sobrepostas: ~111% → 100%); "framely" letra a letra |
| 2 | 30–75 | `Scene2Burst` | O logo colapsa; pílulas azul/vermelho/amarelo/verde e arcos finos voam em trajetória radial (`cos`/`sin`); Instagram, TikTok, YouTube, cursor e chip de ROAS giram até suas posições; "Ads & Motion" com scale-up elástico |
| 3 | 75–120 | `Scene3Performance` | Pílulas convergem para o contorno do escudo de conversão, que é desenhado por traço; "Performance" e traços radiais piscando |
| 4 | 120–180 | `Scene4Scan` | Círculo azul desenhado por `strokeDashoffset`, expande para um viewfinder de IA (micro-linhas, cantoneiras, criativo, caixas de detecção) e uma linha de escaneamento desce e volta |
| 5 | 180–225 | `Scene5Success` | Clarão verde, anel azul → verde, logo com glow neon e selo com check desenhado por traço — "Anúncio aprovado" |
| 6 | 225–285 | `Scene6Outro` | Elementos somem rápido; o logo se centraliza com "framely" e "framely.com.br"; fade final |

## Estrutura

```
src/
├── index.ts                  # registerRoot
├── Root.tsx                  # <Composition id="MainAd" />
├── compositions/MainAd.tsx   # <Sequence> de cada fase
├── scenes/                   # Scene1Pop … Scene6Outro
├── components/               # logo, ícones sociais, escudo, card, primitivas SVG
└── lib/
    ├── constants.ts          # specs, paleta, mapa de cenas
    ├── motion.ts             # física de mola única + helpers (pulse, fade, polar)
    ├── burst.ts              # layout determinístico da explosão (compartilhado entre cenas 2 e 3)
    └── fonts.ts              # Inter variável local (public/fonts, licença OFL)
```

Os ícones e formas são SVG puro. A fonte Inter fica embutida em `public/fonts`, então o
render funciona offline e sai idêntico em qualquer máquina.
