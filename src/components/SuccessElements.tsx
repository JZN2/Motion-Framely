import React from "react";
import { COLORS, RING_RADIUS } from "../lib/constants";
import { CenterSvg } from "./Primitives";

/** Clarão verde suave (gradiente radial). */
export const GreenFlash: React.FC<{ intensity: number; scale: number }> = ({ intensity, scale }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 1100,
      height: 1100,
      borderRadius: "50%",
      transform: `translate(-50%, -50%) scale(${Math.max(0, scale)})`,
      background:
        "radial-gradient(circle, rgba(43,212,106,0.55) 0%, rgba(43,212,106,0.22) 38%, rgba(43,212,106,0) 68%)",
      opacity: Math.max(0, Math.min(1, intensity)),
    }}
  />
);

/** Anel que passa de azul para verde (com brilho). */
export const SuccessRing: React.FC<{
  radius?: number;
  green: number; // 0 → 1 varredura do traço verde
  opacity?: number;
}> = ({ radius = RING_RADIUS, green, opacity = 1 }) => (
  <CenterSvg style={{ opacity: Math.max(0, Math.min(1, opacity)) }}>
    <defs>
      <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
    </defs>
    <circle r={radius} fill="none" stroke={COLORS.blue} strokeWidth={14} opacity={1 - Math.min(1, green)} />
    <g transform="rotate(-90)">
      <circle
        r={radius}
        fill="none"
        stroke={COLORS.success}
        strokeWidth={22}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, green)}
        filter="url(#ring-glow)"
        opacity={0.8}
      />
      <circle
        r={radius}
        fill="none"
        stroke={COLORS.success}
        strokeWidth={14}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, green)}
      />
    </g>
  </CenterSvg>
);

/** Selo verde com check desenhado por traço SVG. */
export const CheckBadge: React.FC<{ size: number; check: number; glow: number }> = ({ size, check, glow }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: COLORS.success,
      border: "8px solid #FFFFFF",
      boxShadow: `0 0 ${50 * glow}px ${12 * glow}px ${COLORS.successGlow}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 60 60">
      <path
        d="M14 31 L26 43 L47 19"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.min(1, check)}
      />
    </svg>
  </div>
);

/** drop-shadow verde neon proporcional ao brilho (0 → 1). */
export const neonGlow = (g: number) => {
  const k = Math.max(0, Math.min(1, g));
  return `drop-shadow(0 0 ${22 * k}px rgba(43,212,106,${0.95 * k})) drop-shadow(0 0 ${60 * k}px rgba(43,212,106,${0.6 * k}))`;
};

export const BADGE_POS = { x: RING_RADIUS * Math.SQRT1_2, y: RING_RADIUS * Math.SQRT1_2 };
export const BADGE_SIZE = 132;
