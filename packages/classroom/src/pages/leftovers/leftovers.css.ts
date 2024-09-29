import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  backgroundColor: theme.color.blue,
  overflow: "hidden",
});

export const center_container = style({
  width: "440px",
  margin: "auto",
  marginTop: "90px",
});

export const header = style({
  width: "100%",
  margin: "0px",
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  color: theme.color.white,
  letterSpacing: "2px",
});

export const main_container = style({
  display: "flex",
});
