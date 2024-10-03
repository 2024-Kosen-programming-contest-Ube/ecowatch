import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

const button_base = style({
  width: "100%",
  height: "47px",
  backgroundColor: "transparent",
  border: "2px solid",
  borderRadius: "11px",
  // marginBottom: "17px",
  fontSize: "20px",
  fontWeight: theme.font.semibold,
});

export const button_white = style([
  button_base,
  {
    color: theme.color.white,
    borderColor: theme.color.white,
  },
]);

export const button_blue = style([
  button_base,
  {
    color: theme.color.blue,
    borderColor: theme.color.blue,
  },
]);
