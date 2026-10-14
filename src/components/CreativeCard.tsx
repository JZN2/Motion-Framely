import React from "react";
import { COLORS } from "../lib/constants";
import { FONT_FAMILY } from "../lib/fonts";

export const CARD_W = 300;
export const CARD_H = 420;

// Mock de um criativo de anúncio (story) sendo analisado pela IA.
export const CreativeCard: React.FC = () => (
  <div
    style={{
      width: CARD_W,
      height: CARD_H,
      borderRadius: 30,
      background: "#FFFFFF",
      boxShadow: "0 24px 60px rgba(14,17,22,0.16), 0 0 0 2px rgba(14,17,22,0.05)",
      overflow: "hidden",
      fontFamily: FONT_FAMILY,
    }}
  >
    <svg width={CARD_W} height={250} viewBox="0 0 300 250" style={{ display: "block" }}>
      <defs>
        <linearGradient id="card-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DCEBFF" />
          <stop offset="1" stopColor="#B9D5FB" />
        </linearGradient>
      </defs>
      <rect width="300" height="250" fill="url(#card-sky)" />
      <circle cx="226" cy="70" r="30" fill={COLORS.yellow} />
      <rect x="40" y="128" width="130" height="34" rx="17" fill={COLORS.blue} />
      <rect x="110" y="176" width="150" height="34" rx="17" fill={COLORS.red} />
      <rect x="22" y="222" width="110" height="34" rx="17" fill={COLORS.green} />
    </svg>
    <div style={{ padding: "20px 24px" }}>
      <div style={{ height: 18, width: 200, borderRadius: 9, background: "#E6E9EE" }} />
      <div style={{ height: 18, width: 140, borderRadius: 9, background: "#E6E9EE", marginTop: 12 }} />
      <div
        style={{
          marginTop: 22,
          height: 50,
          borderRadius: 25,
          background: COLORS.brand,
          color: "#FFFFFF",
          fontSize: 24,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Saiba mais
      </div>
    </div>
  </div>
);
