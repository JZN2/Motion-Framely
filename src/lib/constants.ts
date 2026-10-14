// Especificações globais do vídeo e paleta da marca.
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 285; // 9.5s

export const COLORS = {
  background: "#FFFFFF",
  ink: "#0E1116",
  muted: "#8A9099",
  brand: "#0B66B2",
  brandLight: "#1A84C7",
  // Paleta das pílulas (idêntica à da referência)
  blue: "#2F7BF6",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
  // Verde neon do estado "aprovado"
  success: "#2BD46A",
  successGlow: "rgba(43, 212, 106, 0.75)",
} as const;

export const PILL_COLORS = [COLORS.blue, COLORS.red, COLORS.yellow, COLORS.green];

// Mapa de cenas — frames absolutos na timeline (from + duração).
export const SCENES = {
  pop: { from: 0, durationInFrames: 30 },
  burst: { from: 30, durationInFrames: 45 },
  performance: { from: 75, durationInFrames: 45 },
  scan: { from: 120, durationInFrames: 60 },
  success: { from: 180, durationInFrames: 45 },
  outro: { from: 225, durationInFrames: 60 },
} as const;

// Tamanhos compartilhados para manter a continuidade entre cenas.
export const LOGO_SIZE = 520; // logo das cenas 1-2
export const RING_RADIUS = 280; // anel que liga as cenas 4 → 5 → 6
export const SUCCESS_LOGO_SIZE = 400; // logo dentro do anel verde
