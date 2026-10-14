import React from "react";
import { FloaterVisual } from "../components/FloaterVisual";
import { CenterSvg, Pill, Place, StaggerText } from "../components/Primitives";
import { SHIELD_CENTER, SHIELD_POINTS, Shield } from "../components/Shield";
import { AdsMotionTitle } from "../components/Titles";
import { FLOATERS, FloaterKey, PILLS, floaterEnd, pillEnd } from "../lib/burst";
import { COLORS } from "../lib/constants";
import { lerp, polar, pulse, useSpring } from "../lib/motion";

const SHIELD_WIDTH = 330;
const SHIELD_SCALE = SHIELD_WIDTH / 200;
const SHIELD_Y = -130; // centro do escudo em relação ao centro do frame
const DASH_COUNT = 16;
const EXIT = 36;

// Ponto do contorno do escudo em coordenadas do frame.
const shieldPoint = (i: number) => {
  const [px, py] = SHIELD_POINTS[i % SHIELD_POINTS.length];
  return {
    x: (px - 100) * SHIELD_SCALE,
    y: (py - SHIELD_CENTER[1]) * SHIELD_SCALE + SHIELD_Y,
  };
};

// FASE 3 — 2.5s → 4.0s (frames 75-120): convergência → escudo "Performance".
export const Scene3Performance: React.FC = () => {
  const s = useSpring();
  const exit = s(EXIT);
  const keep = 1 - exit;

  const shieldPop = s(4) * 1.15 - s(10) * 0.15;

  return (
    <>
      {/* Pílulas convergem para o contorno do escudo e se dissolvem nele */}
      {PILLS.map((p, i) => {
        const from = pillEnd(p);
        const to = shieldPoint(i);
        const c = s(i % 4);
        const shrink = s(8 + (i % 4));
        return (
          <Place
            key={i}
            x={lerp(from.x, to.x, c)}
            y={lerp(from.y, to.y, c)}
            rotate={p.angle + 18 + 90 * c}
            scale={(1 - 0.6 * c) * (1 - shrink)}
          >
            <Pill length={p.length} thickness={p.thickness} color={p.color} />
          </Place>
        );
      })}

      {/* Redes sociais / métricas são sugadas para o centro */}
      {(Object.keys(FLOATERS) as FloaterKey[]).map((key, i) => {
        const from = floaterEnd(key);
        const c = s(i * 0.8);
        return (
          <Place
            key={key}
            x={lerp(from.x, 0, c)}
            y={lerp(from.y, SHIELD_Y, c)}
            rotate={from.rotate + 160 * c}
            scale={1 - c}
          >
            <FloaterVisual k={key} />
          </Place>
        );
      })}

      {/* "Ads & Motion" sai com mola inversa */}
      <Place scale={1 - s(0)} opacity={1 - s(1)}>
        <AdsMotionTitle />
      </Place>

      {/* Traços radiais piscando (efeito "Security" da referência) */}
      <CenterSvg>
        <g transform={`translate(0 ${SHIELD_Y})`} opacity={keep}>
          {new Array(DASH_COUNT).fill(0).map((_, i) => {
            const wave = i % 2 === 0 ? 12 : 15;
            const d = wave + Math.floor(i / 2) * 0.35;
            const blink = Math.max(pulse(s, d, d + 7), pulse(s, d + 14, d + 21));
            const travel = s(d) + s(d + 14);
            const angle = (i * 360) / DASH_COUNT - 90;
            const r0 = 250 + 26 * travel;
            const a = polar(angle, r0);
            const b = polar(angle, r0 + 64 * blink);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y * 1.1}
                x2={b.x}
                y2={b.y * 1.1}
                stroke={i % 4 === 0 ? COLORS.blue : COLORS.ink}
                strokeWidth={10}
                strokeLinecap="round"
                opacity={Math.min(1, blink * 1.4)}
              />
            );
          })}
        </g>
      </CenterSvg>

      {/* Escudo de conversão */}
      <Place y={SHIELD_Y} scale={shieldPop * keep} rotate={(1 - s(4)) * -10}>
        <Shield width={SHIELD_WIDTH} outline={s(5)} fill={s(9)} trend={s(12)} arrow={s(16)} />
      </Place>

      {/* Palavra "Performance" */}
      <Place y={SHIELD_Y + 440} opacity={keep} scale={1 - 0.3 * exit}>
        <StaggerText text="Performance" size={104} weight={800} letterSpacing={-0.035} progress={(i) => s(12 + i * 0.9)} />
      </Place>
    </>
  );
};
