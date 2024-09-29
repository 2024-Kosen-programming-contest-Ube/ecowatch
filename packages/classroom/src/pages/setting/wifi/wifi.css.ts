import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const background = style({
  width: theme.window.width,
  height: theme.window.height,
  backgroundColor: theme.color.white,
});

export const header = style({
  width: "100%",
  height: "38px",
  backgroundColor: theme.color.blue,
});

export const input_container = style({
  display: "grid",
  // gridTemplateColumns: 1,
  rowGap: "24px",
  width: "360px",
  margin: "auto",
  marginTop: "50px",
});

export const back_button_container = style({
  width: "210px",
  margin: "auto",
  marginTop: "20px",
});
