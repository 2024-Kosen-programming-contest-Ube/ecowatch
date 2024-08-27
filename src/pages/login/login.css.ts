import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const container = style({
  width: vars.window.width,
  height: vars.window.height,
  overflow: "hidden",
});

export const header = style({
  width: "100%",
  height: "38px",
  backgroundColor: vars.color.blue,
});

export const input_container = style({
  display: "grid",
  // gridTemplateColumns: 1,
  rowGap: "24px",
  width: "360px",
  margin: "auto",
  marginTop: "50px",
});

export const input_row = style({
  display: "flex",
});

export const label = style({
  width: "150px",
  height: "48px",
  color: vars.color.blue,
  fontWeight: vars.font.semibold,
  fontSize: "20px",
  lineHeight: "48px",
});
