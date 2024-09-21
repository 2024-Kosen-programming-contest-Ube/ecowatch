import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "max-content",
  margin: "auto",
});

export const header = style({
  textAlign: "center",
  color: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "40px",
});

export const point = style({
  margin: "0",
  fontWeight: theme.font.medium,
  fontSize: "160px",
  lineHeight: "160px",
  textAlign: "center",
});

export const button_container = style({
  width: "max-content",
  margin: "auto",
  marginTop: "40px",
});
