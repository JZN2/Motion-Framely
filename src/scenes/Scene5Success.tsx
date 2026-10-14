import React from "react";
import { FramelyLogo } from "../components/FramelyLogo";
import { CenterSvg, Place, StaggerText } from "../components/Primitives";
import {
  BADGE_POS,
  BADGE_SIZE,
  CheckBadge,
  GreenFlash,
  SuccessRing,
  neonGlow,
} from "../components/SuccessElements";
import { COLORS, RING_RADIUS, SUCCESS_LOGO_SIZE } from "../lib/constants";
import { polar, pulse, useSpring } from "../lib/motion";

export const SUCCESS_TEXT_Y = RING_RADIUS + 150;

// FASE 5 — 6.0s → 7.5s (frames 180-225): clarão verde + check aprovado.
export const Scene5Success: React.FC = () => {
  const s = useSpring();

  const flash = 0.95 * s(0) - 0.6 * s(7);
  const logoPop = s(3) * 1.2 - s(9) * 0.2;
  const badgePop = s(10) * 1.25 - s(16) * 0.25;

  return (
    <>
      <GreenFlash intensity={flash} scale={0.35 + 0.75 * s(0)} />
      <SuccessRing green={s(0)} />

      <Place scale={logoPop} rotate={(1 - s(3)) * -14} style={{ filter: neonGlow(s(6)) }}>
        <FramelyLogo size={SUCCESS_LOGO_SIZE} play={s(6)} />
      </Place>

      {/* Faíscas verdes ao redor do selo */}
      <CenterSvg>
        <g transform={`translate(${BADGE_POS.x} ${BADGE_POS.y})`}>
          {new Array(8).fill(0).map((_, i) => {
            const blink = pulse(s, 12, 19);
            const angle = i * 45 - 90;
            const r0 = BADGE_SIZE / 2 + 18 + 30 * s(12);
            const a = polar(angle, r0);
            const b = polar(angle, r0 + 34 * blink);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={COLORS.success}
                strokeWidth={8}
                strokeLinecap="round"
                opacity={Math.min(1, blink * 1.5)}
              />
            );
          })}
        </g>
      </CenterSvg>

      <Place x={BADGE_POS.x} y={BADGE_POS.y} scale={badgePop}>
        <CheckBadge size={BADGE_SIZE} check={s(14)} glow={s(12)} />
      </Place>

      <Place y={SUCCESS_TEXT_Y}>
        <StaggerText
          text="Anúncio aprovado"
          size={64}
          weight={700}
          color="#16A34A"
          progress={(i) => s(15 + i * 0.6)}
          rise={30}
        />
      </Place>
    </>
  );
};
