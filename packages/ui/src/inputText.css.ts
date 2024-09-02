import { style } from "@vanilla-extract/css";
import { theme } from "./theme.css";

export const input = style({
  appearance: "none",
  width: "210px",
  height: "48px",
  padding: "6px 12px 6px 12px",
  border: "2px solid",
  borderColor: theme.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: theme.color.white,
  fontWeight: theme.font.medium,
  fontSize: "16px",
  boxSizing: "border-box",
});
