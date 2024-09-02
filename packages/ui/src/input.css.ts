import { style } from "@vanilla-extract/css";
import { theme } from "./theme.css";

export const input_row = style({
  display: "flex",
});

export const label = style({
  width: "150px",
  height: "48px",
  color: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  lineHeight: "48px",
});
