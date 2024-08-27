import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const input = style({
  appearance: "none",
  width: "210px",
  height: "48px",
  padding: "6px 12px 6px 12px",
  border: "2px solid",
  borderColor: vars.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: vars.color.white,
  fontWeight: vars.font.medium,
  fontSize: "16px",
  boxSizing: "border-box",
});
