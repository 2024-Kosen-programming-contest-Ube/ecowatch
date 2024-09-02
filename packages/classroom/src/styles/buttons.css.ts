import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

const button_base = style({
  width: "100%",
  height: "47px",
  backgroundColor: "transparent",
  color: vars.color.white,
  border: "2px solid",
  borderColor: vars.color.white,
  borderRadius: "11px",
  marginBottom: "17px",
  fontSize: "20px",
  fontWeight: vars.font.semibold,
});

export const button_white = style([
  button_base,
  {
    color: vars.color.white,
  },
]);
