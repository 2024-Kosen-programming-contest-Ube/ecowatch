import { theme } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const header_container = style({
  width: "100%",
  height: "64px",
  backgroundColor: theme.color.blue,
});

export const title = style({
  height: "64px",
  margin: "0",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: theme.font.semibold,
  lineHeight: "64px",
  color: theme.color.white,
});
