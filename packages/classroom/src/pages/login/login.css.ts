import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  overflow: "hidden",
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
