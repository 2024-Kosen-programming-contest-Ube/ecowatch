import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  backgroundColor: theme.color.blue,
});

export const top_container = style({
  width: "100%",
  height: "88px",
});

export const button_container = style({
  width: "212px",
  margin: "auto",
});
