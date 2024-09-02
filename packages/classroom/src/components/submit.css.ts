import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const submit = style({
  appearance: "none",
  width: "210px",
  height: "48px",
  padding: "6px 12px 6px 12px",
  margin: "auto",
  border: "2px solid",
  borderColor: vars.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: vars.color.white,
  color: vars.color.blue,
  fontWeight: vars.font.semibold,
  fontSize: "20px",
  boxSizing: "border-box",
});
