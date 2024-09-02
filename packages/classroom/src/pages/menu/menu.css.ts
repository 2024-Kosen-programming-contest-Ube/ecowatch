import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  width: vars.window.width,
  height: vars.window.height,
  backgroundColor: vars.color.blue,
});

export const top_container = style({
  width: "100%",
  height: "88px",
});

export const button_container = style({
  width: "212px",
  margin: "auto",
});
