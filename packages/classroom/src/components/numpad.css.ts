import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: theme.window.width,
  height: theme.window.height,
  backgroundColor: theme.color.blue,
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
  fontWeight: theme.font.semibold,
  fontSize: "24px",
  color: theme.color.white,
  letterSpacing: "2px",
});

export const main_container = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

export const left_container = style({
  position: "relative",
});

export const display_header = style({
  margin: "0px",
  color: theme.color.white,
  fontWeight: theme.font.semibold,
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
  backgroundColor: theme.color.white,
  fontWeight: theme.font.semibold,
  fontSize: "40px",
  lineHeight: "64px",
  textAlign: "center",
});

export const diaplay_prefix = style({
  height: "54px",
  margin: "0px",
  marginTop: "12px",
  fontWeight: theme.font.semibold,
  fontSize: "40px",
  color: theme.color.white,
});

export const back_button_container = style({
  width: "160px",
  position: "absolute",
  bottom: 0,
});

export const button_container = style({
  display: "grid",
  marginTop: "8px",
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
  backgroundColor: theme.color.white,
  fontWeight: theme.font.medium,
  fontSize: "30px",
});
