import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

const button_base = style({
  width: "100%",
  height: "47px",
  backgroundColor: "transparent",
  color: theme.color.white,
  border: "2px solid",
  borderColor: theme.color.white,
  borderRadius: "11px",
  marginBottom: "17px",
  fontSize: "20px",
  fontWeight: theme.font.semibold,
});

export const button_white = style([
  button_base,
  {
    color: theme.color.white,
  },
]);
