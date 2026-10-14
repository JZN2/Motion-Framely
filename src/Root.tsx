import React from "react";
import { Composition } from "remotion";
import { MainAd } from "./compositions/MainAd";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./lib/constants";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MainAd"
    component={MainAd}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
