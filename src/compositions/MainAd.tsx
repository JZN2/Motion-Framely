import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, SCENES } from "../lib/constants";
import { Scene1Pop } from "../scenes/Scene1Pop";
import { Scene2Burst } from "../scenes/Scene2Burst";
import { Scene3Performance } from "../scenes/Scene3Performance";
import { Scene4Scan } from "../scenes/Scene4Scan";
import { Scene5Success } from "../scenes/Scene5Success";
import { Scene6Outro } from "../scenes/Scene6Outro";

// Timeline completa: 285 frames @30fps, cenas encadeadas sem sobreposição.
export const MainAd: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: "hidden" }}>
    <Sequence name="1 · Pop" {...SCENES.pop}>
      <Scene1Pop />
    </Sequence>
    <Sequence name="2 · Explosão + Social" {...SCENES.burst}>
      <Scene2Burst />
    </Sequence>
    <Sequence name="3 · Performance" {...SCENES.performance}>
      <Scene3Performance />
    </Sequence>
    <Sequence name="4 · Viewfinder IA" {...SCENES.scan}>
      <Scene4Scan />
    </Sequence>
    <Sequence name="5 · Aprovado" {...SCENES.success}>
      <Scene5Success />
    </Sequence>
    <Sequence name="6 · Encerramento" {...SCENES.outro}>
      <Scene6Outro />
    </Sequence>
  </AbsoluteFill>
);
