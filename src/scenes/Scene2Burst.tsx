import React from "react";
import { FramelyLogo } from "../components/FramelyLogo";
import { ArcStroke, CenterSvg, Pill, Place, StaggerText } from "../components/Primitives";
import { AdsMotionTitle } from "../components/Titles";
import { FloaterVisual } from "../components/FloaterVisual";
import {
  ARCS,
  BURST_ORIGIN,
  FLOAT_DELAY,
  FLOAT_OFFSET,
  FLOATERS,
  FloaterKey,
  PILLS,
} from "../lib/burst";
import { COLORS, LOGO_SIZE } from "../lib/constants";
import { fade, lerp, pulse, useSpring } from "../lib/motion";
import { WORDMARK_Y } from "./Scene1Pop";

// FASE 2 — 1.0s → 2.5s (frames 30-75): o logo se desfaz em explosão radial.
export const Scene2Burst: React.FC = () => {
  const s = useSpring();

  // Antecipação curta (cresce 12%) e colapso total do logo.
  const logoScale = 1 + 0.12 * s(0) - 1.12 * s(3);
  const shock = s(1);

  return (
    <>
      {/* Onda de choque + arcos curvos finos */}
      <CenterSvg>
        <circle
          cx={BURST_ORIGIN.x}
          cy={BURST_ORIGIN.y}
          r={60 + 520 * shock}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth={Math.max(0, 16 * (1 - shock))}
          opacity={Math.max(0, 1 - s(4))}
        />
        <g transform={`translate(0 ${BURST_ORIGIN.y * (1 - s(0))})`}>
          {ARCS.map((a, i) => {
            const p = s(a.delay);
            return (
              <ArcStroke
                key={i}
                radius={40 + (a.radius - 40) * p + 260 * s(14)}
                startDeg={a.start + a.turn * p}
                sweepDeg={Math.max(1, a.sweep * p)}
                color={a.color}
                width={8}
                opacity={fade(p, 0.3) - s(14)}
              />
            );
          })}
        </g>
      </CenterSvg>

      {/* Pílulas geométricas em trajetória radial (cos/sin) */}
      {PILLS.map((p, i) => {
        const t = s(p.delay);
        const drift = s(FLOAT_DELAY + (i % 3));
        return (
          <Place
            key={i}
            x={lerp(BURST_ORIGIN.x, p.rx, t) + p.driftX * drift}
            y={lerp(BURST_ORIGIN.y, p.ry, t) + p.driftY * drift}
            rotate={p.angle + p.spin * (1 - t) + 18 * drift}
            scale={t}
          >
            <Pill length={p.length} thickness={p.thickness} color={p.color} />
          </Place>
        );
      })}

      {/* Logo colapsando + wordmark saindo */}
      <Place x={BURST_ORIGIN.x} y={BURST_ORIGIN.y} scale={logoScale} rotate={30 * s(3)}>
        <FramelyLogo size={LOGO_SIZE} />
      </Place>
      <Place y={WORDMARK_Y + 60 * s(0)} opacity={1 - s(0)} scale={1 - 0.3 * s(0)}>
        <StaggerText text="framely" size={124} weight={700} progress={() => 1} />
      </Place>

      {/* Redes sociais e elementos de tráfego pago flutuando e girando */}
      {(Object.keys(FLOATERS) as FloaterKey[]).map((key) => {
        const f = FLOATERS[key];
        const t = s(f.delay);
        const float = s(FLOAT_DELAY + f.delay / 2);
        const len = Math.hypot(f.x, f.y);
        return (
          <Place
            key={key}
            x={lerp(BURST_ORIGIN.x, f.x, t) + (f.x / len) * FLOAT_OFFSET * float}
            y={lerp(BURST_ORIGIN.y, f.y, t) + (f.y / len) * FLOAT_OFFSET * float}
            rotate={-200 * (1 - t) + f.tilt - f.tilt * 0.6 * float}
            scale={t}
          >
            <FloaterVisual
              k={key}
              ripple={{
                scale: 0.2 + 1.1 * s(f.delay + 6),
                opacity: pulse(s, f.delay + 4, f.delay + 12),
              }}
            />
          </Place>
        );
      })}

      {/* "Ads & Motion" com scale-up elástico */}
      <Place scale={s(10) * 1.2 - s(16) * 0.2} rotate={(1 - s(10)) * 8}>
        <AdsMotionTitle />
      </Place>
    </>
  );
};
