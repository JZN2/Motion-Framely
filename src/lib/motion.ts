import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Física única do projeto — reproduz o "snap" elástico da referência.
// Toda escala/posição/rotação/opacidade é derivada destes valores.
export const SPRING_CONFIG = { damping: 14, stiffness: 120, mass: 0.6 } as const;

export const springAt = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: SPRING_CONFIG });

/**
 * Retorna uma função `s(delay)` que dá o progresso (0 → 1, com overshoot)
 * da mola iniciada em `delay` frames dentro da Sequence atual.
 */
export const useSpring = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (delay = 0) => springAt(frame, fps, delay);
};

/** Mola de "pulso": entra em `inAt` e sai em `outAt` (útil para piscar). */
export const pulse = (s: (d?: number) => number, inAt: number, outAt: number) =>
  Math.max(0, s(inAt) - s(outAt));

/** Opacidade a partir do progresso da mola (sem ultrapassar 0..1). */
export const fade = (progress: number, until = 0.6) =>
  interpolate(progress, [0, until], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const polar = (angleDeg: number, radius: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
};
