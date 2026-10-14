import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_FAMILY } from "../lib/fonts";
import { COLORS } from "../lib/constants";

/** Camada centralizada: (0,0) = centro do frame 1080x1920. */
export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...style }}>
    {children}
  </AbsoluteFill>
);

/** Elemento posicionado a partir do centro do frame. */
export const Place: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x = 0, y = 0, scale = 1, rotate = 0, opacity = 1, children, style }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${Math.max(0, scale)})`,
      opacity: Math.max(0, Math.min(1, opacity)),
      ...style,
    }}
  >
    {children}
  </div>
);

/** Pílula geométrica (retângulo de bordas totalmente arredondadas). */
export const Pill: React.FC<{ length: number; thickness: number; color: string }> = ({
  length,
  thickness,
  color,
}) => (
  <svg width={length} height={thickness} viewBox={`0 0 ${length} ${thickness}`} style={{ display: "block" }}>
    <rect width={length} height={thickness} rx={thickness / 2} fill={color} />
  </svg>
);

/** Arco fino em SVG, centrado no meio do frame. */
export const ArcStroke: React.FC<{
  radius: number;
  startDeg: number;
  sweepDeg: number;
  color: string;
  width?: number;
  opacity?: number;
}> = ({ radius, startDeg, sweepDeg, color, width = 8, opacity = 1 }) => {
  const r = Math.max(0.01, radius);
  const a0 = (startDeg * Math.PI) / 180;
  const a1 = ((startDeg + sweepDeg) * Math.PI) / 180;
  const p0 = [Math.cos(a0) * r, Math.sin(a0) * r];
  const p1 = [Math.cos(a1) * r, Math.sin(a1) * r];
  const large = Math.abs(sweepDeg) > 180 ? 1 : 0;
  return (
    <path
      d={`M${p0[0]} ${p0[1]} A${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}`}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={Math.max(0, Math.min(1, opacity))}
    />
  );
};

/** SVG de tela cheia com origem no centro — para arcos, traços e anéis. */
export const CenterSvg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <svg
    width={1080}
    height={1920}
    viewBox="-540 -960 1080 1920"
    style={{ position: "absolute", inset: 0, overflow: "visible", ...style }}
  >
    {children}
  </svg>
);

/** Texto com letras animadas individualmente (stagger por mola). */
export const StaggerText: React.FC<{
  text: string;
  progress: (index: number) => number;
  size: number;
  weight?: number;
  color?: string;
  letterSpacing?: number;
  rise?: number;
  colorFor?: (char: string, index: number) => string | undefined;
}> = ({ text, progress, size, weight = 700, color = COLORS.ink, letterSpacing = -0.02, rise = 50, colorFor }) => (
  <div
    style={{
      display: "flex",
      fontFamily: FONT_FAMILY,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: `${letterSpacing}em`,
      color,
      whiteSpace: "pre",
      lineHeight: 1,
    }}
  >
    {text.split("").map((char, i) => {
      const p = progress(i);
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: `translateY(${(1 - p) * rise}px) scale(${0.6 + 0.4 * p})`,
            opacity: Math.max(0, Math.min(1, p * 1.6)),
            color: colorFor?.(char, i) ?? color,
          }}
        >
          {char}
        </span>
      );
    })}
  </div>
);

/** Chip de métrica de tráfego pago (ex.: "ROAS 4.8x"). */
export const MetricChip: React.FC<{ label: string; value: string; accent: string }> = ({
  label,
  value,
  accent,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 28px",
      borderRadius: 999,
      background: "#FFFFFF",
      boxShadow: "0 18px 40px rgba(14,17,22,0.14), 0 0 0 2px rgba(14,17,22,0.04)",
      fontFamily: FONT_FAMILY,
      fontSize: 34,
      fontWeight: 700,
      color: COLORS.ink,
      whiteSpace: "nowrap",
    }}
  >
    <svg width={30} height={30} viewBox="0 0 30 30">
      <path d="M4 22 L12 14 L17 19 L26 8" fill="none" stroke={accent} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8 H26 V16" fill="none" stroke={accent} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ color: COLORS.muted, fontWeight: 600 }}>{label}</span>
    <span style={{ color: accent }}>{value}</span>
  </div>
);
