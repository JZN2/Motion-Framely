import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter variável (OFL) embutida em /public — render 100% offline e determinístico.
export const FONT_FAMILY = "Inter";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/Inter-Variable.woff2"),
  weight: "100 900",
  format: "woff2",
});
