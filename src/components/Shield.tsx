import React from "react";
import { COLORS } from "../lib/constants";

// Escudo minimalista com seta de conversão (viewBox 200x240, centro em 100,117).
export const SHIELD_PATH =
  "M100 14 L178 44 V110 C178 160 146 198 100 222 C54 198 22 160 22 110 V44 Z";
const TREND_PATH = "M58 146 L86 116 L108 136 L142 98";
const ARROW_PATH = "M118 96 H144 V122";

// Pontos ao longo do contorno — destino das pílulas que formam o escudo.
export const SHIELD_POINTS: [number, number][] = [
  [100, 14], [139, 29], [178, 44], [178, 77], [178, 110], [172, 140],
  [158, 168], [134, 194], [100, 222], [66, 194], [42, 168], [28, 140],
  [22, 110], [22, 77], [22, 44], [61, 29],
];
export const SHIELD_CENTER: [number, number] = [100, 118];

export const Shield: React.FC<{
  width: number;
  outline: number; // 0 → 1 desenho do contorno
  fill: number; // 0 → 1 preenchimento suave
  trend: number; // 0 → 1 desenho da seta
  arrow: number; // 0 → 1 ponta da seta
}> = ({ width, outline, fill, trend, arrow }) => (
  <svg width={width} height={(width * 240) / 200} viewBox="0 0 200 240" style={{ overflow: "visible" }}>
    <path d={SHIELD_PATH} fill="#EAF2FE" opacity={Math.max(0, Math.min(1, fill))} />
    <path
      d={SHIELD_PATH}
      fill="none"
      stroke={COLORS.brand}
      strokeWidth={14}
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.min(1, outline)}
    />
    <path
      d={TREND_PATH}
      fill="none"
      stroke={COLORS.blue}
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.min(1, trend)}
    />
    <path
      d={ARROW_PATH}
      fill="none"
      stroke={COLORS.blue}
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.min(1, arrow)}
    />
  </svg>
);
