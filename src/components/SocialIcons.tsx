import React, { useId } from "react";

type IconProps = { size: number; style?: React.CSSProperties };

const shadow = "drop-shadow(0 18px 30px rgba(14, 17, 22, 0.18))";

export const InstagramIcon: React.FC<IconProps> = ({ size, style }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: shadow, ...style }}>
      <defs>
        <radialGradient id={`ig-${id}`} cx="0.28" cy="1.05" r="1.25">
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.12" stopColor="#FFDD55" />
          <stop offset="0.45" stopColor="#FF543E" />
          <stop offset="0.7" stopColor="#C837AB" />
          <stop offset="1" stopColor="#3771C8" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill={`url(#ig-${id})`} />
      <rect x="21" y="21" width="58" height="58" rx="18" fill="none" stroke="#fff" strokeWidth="7" />
      <circle cx="50" cy="50" r="13.5" fill="none" stroke="#fff" strokeWidth="7" />
      <circle cx="67" cy="33" r="4.4" fill="#fff" />
    </svg>
  );
};

const TIKTOK_NOTE =
  "M56 20 h12 c1 9 7 15 16 16 v12 c-6 0-11-2-16-5 v22 c0 11-9 20-20 20 s-20-9-20-20 " +
  "s9-20 20-20 c1 0 3 0 4 0 v12 c-1 0-3-1-4-1 c-5 0-9 4-9 9 s4 9 9 9 s9-4 9-9 Z";

export const TikTokIcon: React.FC<IconProps> = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: shadow, ...style }}>
    <rect width="100" height="100" rx="26" fill="#010101" />
    <g transform="translate(-6 -2.5)">
      <path d={TIKTOK_NOTE} fill="#25F4EE" transform="translate(-3 -3)" />
      <path d={TIKTOK_NOTE} fill="#FE2C55" transform="translate(3 3)" />
      <path d={TIKTOK_NOTE} fill="#FFFFFF" />
    </g>
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: shadow, ...style }}>
    <rect width="100" height="100" rx="26" fill="#FFFFFF" />
    <rect x="12" y="25" width="76" height="50" rx="15" fill="#FF0033" />
    <path d="M43 37 L63 50 L43 63 Z" fill="#FFFFFF" strokeLinejoin="round" />
  </svg>
);

/** Cursor de clique (tráfego pago). */
export const CursorIcon: React.FC<IconProps> = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: shadow, ...style }}>
    <path
      d="M30 14 L30 82 L46 67 L57 90 L69 85 L58 62 L80 62 Z"
      fill="#0E1116"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);
