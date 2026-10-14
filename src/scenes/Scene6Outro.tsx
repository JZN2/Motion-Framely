import React from "react";
import { FramelyLogo } from "../components/FramelyLogo";
import { Place, StaggerText } from "../components/Primitives";
import {
  BADGE_POS,
  BADGE_SIZE,
  CheckBadge,
  GreenFlash,
  SuccessRing,
  neonGlow,
} from "../components/SuccessElements";
import { COLORS, RING_RADIUS, SUCCESS_LOGO_SIZE } from "../lib/constants";
import { FONT_FAMILY } from "../lib/fonts";
import { fade, useSpring } from "../lib/motion";
import { SUCCESS_TEXT_Y } from "./Scene5Success";

const FINAL_FADE = 47;

// FASE 6 — 7.5s → 9.5s (frames 225-285): tudo some, fica só a marca.
export const Scene6Outro: React.FC = () => {
  const s = useSpring();

  const out = s(0); // saída rápida dos elementos da Cena 5
  const settle = s(4); // logo centraliza
  const end = s(FINAL_FADE); // fade final
  const keep = 1 - end;

  return (
    <>
      <GreenFlash intensity={0.35 * (1 - out)} scale={1.1 + 0.4 * out} />
      <SuccessRing green={1} radius={RING_RADIUS + 90 * out} opacity={1 - out} />
      <Place x={BADGE_POS.x} y={BADGE_POS.y} scale={1 - s(0)} rotate={90 * out}>
        <CheckBadge size={BADGE_SIZE} check={1} glow={1 - out} />
      </Place>
      <Place y={SUCCESS_TEXT_Y + 40 * out} opacity={1 - s(0)} scale={1 - 0.2 * out}>
        <StaggerText text="Anúncio aprovado" size={64} weight={700} color="#16A34A" progress={() => 1} />
      </Place>

      {/* Marca final */}
      <Place
        y={-110 * settle}
        scale={(1 + 0.15 * settle) * (1 - 0.06 * end)}
        opacity={keep}
        style={{ filter: neonGlow(1 - out) }}
      >
        <FramelyLogo size={SUCCESS_LOGO_SIZE} />
      </Place>
      <Place y={230 - 20 * end} opacity={keep}>
        <StaggerText text="framely" size={128} weight={700} progress={(i) => s(9 + i * 1.2)} />
      </Place>
      <Place y={340 - 20 * end} opacity={fade(s(18), 0.8) * 0.85 * keep}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: COLORS.muted,
            transform: `translateY(${(1 - s(18)) * 24}px)`,
          }}
        >
          framely.com.br
        </div>
      </Place>
    </>
  );
};
