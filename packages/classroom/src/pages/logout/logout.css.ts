import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  overflow: "hidden",
});
