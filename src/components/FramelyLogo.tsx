import React, { useId } from "react";
import { COLORS } from "../lib/constants";

type Point = [number, number];

// Polígono com cantos arredondados (para o play com cantos suaves do logo).
const roundedPolygon = (points: Point[], r: number) => {
  const n = points.length;
  let d = "";
  points.forEach((p, i) => {
    const prev = points[(i - 1 + n) % n];
    const next = points[(i + 1) % n];
    const toward = (from: Point, to: Point): Point => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];
      const len = Math.hypot(dx, dy);
      return [from[0] + (dx / len) * r, from[1] + (dy / len) * r];
    };
    const a = toward(p, prev);
    const b = toward(p, next);
    d += `${i === 0 ? "M" : "L"}${a[0]},${a[1]} Q${p[0]},${p[1]} ${b[0]},${b[1]} `;
  });
  return d + "Z";
};

const PLAY_OUTER = roundedPolygon(
  [
    [444, 404],
    [612, 510],
    [444, 616],
  ],
  34,
);
const PLAY_INNER = roundedPolygon(
  [
    [484, 462],
    [568, 511],
    [484, 560],
  ],
  4,
);

// Quadrado com cantos arredondados + linha fluida que entra pela esquerda.
const FRAME_PATH =
  "M218 425 H322 A56 56 0 0 0 378 369 V354 A56 56 0 0 1 434 298 H658 " +
  "A68 68 0 0 1 726 366 V658 A68 68 0 0 1 658 726 H366 A68 68 0 0 1 298 658 V463";
const CORNER_STUB = "M298 389 V366 A68 68 0 0 1 366 298 H364";

export const LOGO_VIEWBOX = "192 192 640 640";

export const FramelyLogo: React.FC<{
  size: number;
  /** 0 → 1: desenha os traços (strokeDashoffset). Default: logo completo. */
  draw?: number;
  /** 0 → 1: escala do play interno (pop independente). */
  play?: number;
  style?: React.CSSProperties;
}> = ({ size, draw = 1, play = 1, style }) => {
  const id = useId().replace(/:/g, "");
  const dash = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg width={size} height={size} viewBox={LOGO_VIEWBOX} style={style}>
      <defs>
        <linearGradient id={`fg-${id}`} x1="0.1" y1="0.15" x2="0.9" y2="0.9">
          <stop offset="0" stopColor={COLORS.brandLight} />
          <stop offset="0.45" stopColor={COLORS.brand} />
          <stop offset="1" stopColor={COLORS.brand} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#fg-${id})`} strokeWidth={32}>
        <path d={FRAME_PATH} {...dash} />
        <path d={CORNER_STUB} {...dash} />
      </g>
      <circle cx={218} cy={425} r={16 * Math.min(1, draw * 4)} fill={COLORS.brandLight} />
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: `scale(${play})`,
        }}
      >
        <path
          d={PLAY_OUTER}
          fill="none"
          stroke={`url(#fg-${id})`}
          strokeWidth={32}
          strokeLinejoin="round"
        />
        <path d={PLAY_INNER} fill={COLORS.brand} />
      </g>
    </svg>
  );
};
