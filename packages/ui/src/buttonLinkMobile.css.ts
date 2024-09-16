import { theme } from "./theme.css";
import { style } from "@vanilla-extract/css";

export const button = style({
  appearance: "none",
  width: "220px",
  height: "36px",
  backgroundColor: theme.color.white,
  border: "1px solid",
  borderRadius: "32px",
  borderColor: theme.color.blue,
  fontWeight: theme.font.medium,
  fontSize: "12px",
});
