import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  backgroundColor: theme.color.white,
});

export const button_container = style({
  display: "grid",
  gap: "18px",
  width: "212px",
  margin: "auto",
  marginTop: "24px",
});
