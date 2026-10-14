import React from "react";
import { CARD_H, CreativeCard } from "../components/CreativeCard";
import { CenterSvg, Place } from "../components/Primitives";
import { COLORS, RING_RADIUS } from "../lib/constants";
import { FONT_FAMILY } from "../lib/fonts";
import { fade, polar, pulse, useSpring } from "../lib/motion";

const R_START = 220;
const R_VIEW = 330;
const TICKS = 72;
const SCAN_DOWN = 18;
const SCAN_UP = 32;
const EXIT = 44;

// Caixas de detecção da IA sobre o criativo (coordenadas relativas ao card).
const DETECTIONS = [
  { x: 186, y: 30, w: 80, h: 80, delay: 22 }, // sol / produto
  { x: 30, y: 120, w: 240, h: 100, delay: 25 }, // shapes
  { x: 16, y: 330, w: 268, h: 66, delay: 29 }, // CTA
];

// FASE 4 — 4.0s → 6.0s (frames 120-180): círculo azul → viewfinder de IA.
export const Scene4Scan: React.FC = () => {
  const s = useSpring();
  const exit = s(EXIT);
  const keep = 1 - exit;

  const draw = s(0);
  const r = R_START + (R_VIEW - R_START) * s(8) - (R_VIEW - RING_RADIUS) * exit;

  // Linha de escaneamento: desce (mola 1) e volta (mola 2) sobre o criativo.
  const half = CARD_H / 2 + 24;
  const down = s(SCAN_DOWN);
  const up = s(SCAN_UP);
  const scanY = -half + 2 * half * (down - up);
  const scanOpacity = pulse(s, SCAN_DOWN - 2, EXIT - 2);
  const progress = Math.min(1, (down + up) / 2);

  const cardScale = (s(12) * 1.12 - s(18) * 0.12) * keep;
  const brackets = s(12);
  const bracketHalf = R_VIEW + 70 - 40 * (1 - brackets) - 60 * exit;

  return (
    <>
      <CenterSvg>
        <defs>
          <clipPath id="scan-clip">
            <circle r={Math.max(1, r - 12)} />
          </clipPath>
          <linearGradient id="scan-trail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={COLORS.blue} stopOpacity={0} />
            <stop offset="1" stopColor={COLORS.blue} stopOpacity={0.28} />
          </linearGradient>
          <filter id="scan-glow" x="-50%" y="-400%" width="200%" height="900%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Micro-linhas de interface ao redor do visor */}
        {new Array(TICKS).fill(0).map((_, i) => {
          const p = s(10 + i * 0.22) * keep;
          const major = i % 6 === 0;
          const lit = i / TICKS < progress;
          const angle = (i * 360) / TICKS - 90;
          const a = polar(angle, r + 26);
          const b = polar(angle, r + 26 + (major ? 30 : 16) * p);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={lit ? COLORS.blue : "#C9D9EE"}
              strokeWidth={major ? 6 : 4}
              strokeLinecap="round"
              opacity={Math.min(1, p * 1.5)}
            />
          );
        })}

        {/* Círculo azul desenhado por strokeDashoffset */}
        <circle
          r={r}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth={14}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - Math.min(1, draw)}
          transform="rotate(-90)"
        />

        {/* Cantoneiras do viewfinder */}
        {[
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ].map(([sx, sy], i) => {
          const x = sx * bracketHalf;
          const y = sy * bracketHalf;
          const arm = 76 * brackets;
          return (
            <path
              key={i}
              d={`M${x} ${y - sy * arm} V${y} H${x - sx * arm}`}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={fade(brackets, 0.4) * keep}
            />
          );
        })}
      </CenterSvg>

      {/* Criativo sendo analisado */}
      <Place scale={cardScale}>
        <div style={{ position: "relative" }}>
          <CreativeCard />
          {DETECTIONS.map((d, i) => {
            const p = s(d.delay);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: d.x,
                  top: d.y,
                  width: d.w,
                  height: d.h,
                  borderRadius: 14,
                  border: `4px solid ${COLORS.blue}`,
                  background: "rgba(47,123,246,0.08)",
                  transform: `scale(${1.25 - 0.25 * p})`,
                  opacity: Math.min(1, p * 1.5) * keep,
                }}
              />
            );
          })}
        </div>
      </Place>

      {/* Linha de escaneamento digital (recortada pelo círculo) */}
      <CenterSvg>
        <g clipPath="url(#scan-clip)" opacity={Math.min(1, scanOpacity)}>
          <g transform={`translate(0 ${scanY})`}>
            <rect
              x={-r}
              y={-110}
              width={2 * r}
              height={110}
              fill="url(#scan-trail)"
              transform={up > 0.05 ? "scale(1 -1)" : undefined}
            />
            <rect x={-r} y={-6} width={2 * r} height={12} fill={COLORS.blue} filter="url(#scan-glow)" />
            <rect x={-r} y={-3} width={2 * r} height={6} rx={3} fill={COLORS.blue} />
          </g>
        </g>
      </CenterSvg>

      {/* Rótulo + progresso */}
      <Place y={R_VIEW + 170} opacity={fade(s(14), 0.5) * keep} scale={0.8 + 0.2 * s(14)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.ink,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: COLORS.blue,
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 32,
            }}
          >
            IA
          </span>
          Analisando criativo
          <span style={{ color: COLORS.blue, fontVariantNumeric: "tabular-nums", width: 110 }}>
            {Math.round(progress * 100)}%
          </span>
        </div>
      </Place>
    </>
  );
};
