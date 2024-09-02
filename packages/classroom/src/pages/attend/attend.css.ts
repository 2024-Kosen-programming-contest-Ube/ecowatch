import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  width: vars.window.width,
  height: vars.window.height,
  backgroundColor: vars.color.blue,
  overflow: "hidden",
  // paddingBottom: "180px",
});

export const center_container = style({
  width: "430px",
  margin: "auto",
  marginTop: "90px",
});

export const header = style({
  width: "100%",
  margin: "0px",
  fontWeight: vars.font.semibold,
  fontSize: "24px",
  color: vars.color.white,
  letterSpacing: "2px",
});

export const main_container = style({
  display: "flex",
});

export const left_container = style({});

export const display_header = style({
  margin: "0px",
  color: vars.color.white,
  fontWeight: vars.font.semibold,
  fontSize: "40px",
});

export const diaplay_container = style({
  display: "flex",
  marginTop: "18px",
});

export const diaplay = style({
  width: "160px",
  height: "64px",
  borderRadius: "16px",
  backgroundColor: vars.color.white,
  fontWeight: vars.font.semibold,
  fontSize: "40px",
  textAlign: "center",
});

export const diaplay_prefix = style({
  height: "54px",
  margin: "0px",
  marginTop: "12px",
  fontWeight: vars.font.semibold,
  fontSize: "40px",
  color: vars.color.white,
});

export const button_container = style({
  display: "grid",
  // width: "212px",
  // margin: "auto",
  marginTop: "8px",
  marginLeft: "16px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  columnGap: "8px",
  rowGap: "8px",
});

export const button = style({
  width: "60px",
  height: "60px",
  padding: "0px",
  borderRadius: "30px",
  border: "0px",
  backgroundColor: vars.color.white,
  fontWeight: vars.font.medium,
  fontSize: "30px",
});
