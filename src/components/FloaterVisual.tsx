import React from "react";
import { FloaterKey } from "../lib/burst";
import { COLORS } from "../lib/constants";
import { MetricChip } from "./Primitives";
import { CursorIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./SocialIcons";

/** Visual de cada elemento flutuante (redes sociais + tráfego pago). */
export const FloaterVisual: React.FC<{
  k: FloaterKey;
  /** Anel de clique do cursor (escala/opacidade vindas de molas). */
  ripple?: { scale: number; opacity: number };
}> = ({ k, ripple }) => {
  switch (k) {
    case "instagram":
      return <InstagramIcon size={176} />;
    case "tiktok":
      return <TikTokIcon size={164} />;
    case "youtube":
      return <YouTubeIcon size={168} />;
    case "roas":
      return <MetricChip label="ROAS" value="4.8x" accent={COLORS.green} />;
    case "cursor":
      return (
        <div style={{ position: "relative" }}>
          {ripple ? (
            <div
              style={{
                position: "absolute",
                left: 36 - 60,
                top: 17 - 60,
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `6px solid ${COLORS.blue}`,
                transform: `scale(${Math.max(0, ripple.scale)})`,
                opacity: Math.max(0, Math.min(1, ripple.opacity)),
              }}
            />
          ) : null}
          <CursorIcon size={120} />
        </div>
      );
  }
};
