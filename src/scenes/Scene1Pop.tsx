import React from "react";
import { FramelyLogo } from "../components/FramelyLogo";
import { Place, StaggerText } from "../components/Primitives";
import { BURST_ORIGIN } from "../lib/burst";
import { LOGO_SIZE } from "../lib/constants";
import { fade, useSpring } from "../lib/motion";

export const WORDMARK_Y = 220;

// FASE 1 — 0.0s → 1.0s (frames 0-30): pop elástico do logo + wordmark.
export const Scene1Pop: React.FC = () => {
  const s = useSpring();

  // Duas molas sobrepostas: avanço agressivo (até ~1.11) e assentamento suave em 1.
  const pop = s(0) * 1.2 - s(6) * 0.2;
  const rotate = (1 - s(0)) * -24;

  return (
    <>
      <Place x={BURST_ORIGIN.x} y={BURST_ORIGIN.y} scale={pop} rotate={rotate} opacity={fade(s(0), 0.25)}>
        <FramelyLogo size={LOGO_SIZE} play={s(4)} />
      </Place>
      <Place y={WORDMARK_Y}>
        <StaggerText text="framely" size={124} weight={700} progress={(i) => s(8 + i * 1.2)} />
      </Place>
    </>
  );
};
