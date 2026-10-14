import React from "react";
import { COLORS } from "../lib/constants";
import { FONT_FAMILY } from "../lib/fonts";

export const AdsMotionTitle: React.FC = () => (
  <div
    style={{
      fontFamily: FONT_FAMILY,
      fontSize: 118,
      fontWeight: 800,
      letterSpacing: "-0.035em",
      color: COLORS.ink,
      whiteSpace: "nowrap",
      lineHeight: 1,
    }}
  >
    Ads <span style={{ color: COLORS.brand }}>&amp;</span> Motion
  </div>
);
