import { random } from "remotion";
import { PILL_COLORS } from "./constants";

// Layout determinístico da explosão — compartilhado entre a Cena 2
// (explosão) e a Cena 3 (convergência), garantindo continuidade exata.

export type PillSpec = {
  angle: number; // direção radial (graus)
  rx: number; // deslocamento final X a partir do centro
  ry: number; // deslocamento final Y
  driftX: number; // flutuação extra para fora (segunda mola)
  driftY: number;
  length: number;
  thickness: number;
  color: string;
  delay: number;
  spin: number; // rotação extra ao voar
};

const PILL_COUNT = 18;
// O frame é vertical: a elipse de dispersão é mais alta que larga.
const RX = 420;
const RY = 760;

export const PILLS: PillSpec[] = new Array(PILL_COUNT).fill(0).map((_, i) => {
  const angle = (i * 360) / PILL_COUNT + (random(`a${i}`) - 0.5) * 14 - 90;
  const f = 0.55 + random(`r${i}`) * 0.38;
  const rad = (angle * Math.PI) / 180;
  const drift = 0.12 + random(`d${i}`) * 0.08;
  return {
    angle,
    rx: Math.cos(rad) * RX * f,
    ry: Math.sin(rad) * RY * f,
    driftX: Math.cos(rad) * RX * drift,
    driftY: Math.sin(rad) * RY * drift,
    length: 72 + Math.round(random(`l${i}`) * 90),
    thickness: 30 + Math.round(random(`t${i}`) * 6),
    color: PILL_COLORS[i % PILL_COLORS.length],
    delay: 2 + (i % 4),
    spin: (random(`s${i}`) - 0.5) * 120,
  };
});

export type ArcSpec = {
  radius: number;
  start: number;
  sweep: number;
  turn: number;
  color: string;
  delay: number;
};

export const ARCS: ArcSpec[] = new Array(8).fill(0).map((_, i) => ({
  radius: 300 + random(`ar${i}`) * 180,
  start: i * 45 + random(`as${i}`) * 30,
  sweep: 38 + random(`aw${i}`) * 44,
  turn: 50 + random(`at${i}`) * 50,
  color: PILL_COLORS[(i + 1) % PILL_COLORS.length],
  delay: 3 + (i % 3),
}));

// Ícones sociais e elementos de tráfego pago (posição final na Cena 2).
export const FLOATERS = {
  instagram: { x: -280, y: -500, tilt: -12, delay: 6 },
  tiktok: { x: 300, y: -310, tilt: 10, delay: 8 },
  youtube: { x: -270, y: 380, tilt: -8, delay: 10 },
  cursor: { x: 290, y: 330, tilt: -6, delay: 12 },
  roas: { x: 40, y: 620, tilt: -4, delay: 14 },
} as const;

// Segunda mola de flutuação (deriva suave após a explosão).
export const FLOAT_DELAY = 20;
export const FLOAT_OFFSET = 26;

export type FloaterKey = keyof typeof FLOATERS;

/** Posição final (após a deriva) de um ícone flutuante na Cena 2. */
export const floaterEnd = (key: FloaterKey) => {
  const f = FLOATERS[key];
  const len = Math.hypot(f.x, f.y);
  return {
    x: f.x + (f.x / len) * FLOAT_OFFSET,
    y: f.y + (f.y / len) * FLOAT_OFFSET,
    rotate: f.tilt * 0.4,
  };
};

/** Posição final (após a deriva) de uma pílula na Cena 2. */
export const pillEnd = (p: PillSpec) => ({ x: p.rx + p.driftX, y: p.ry + p.driftY });

/** Origem da explosão = centro do logo na Cena 1/2. */
export const BURST_ORIGIN = { x: 0, y: -110 };
