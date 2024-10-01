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

export const title = style({
  marginTop: "10px",
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  color: theme.color.blue,
  textAlign: "center",
});

export const graph_container = style({
  display: "flex",
});

export const graph_inner_container = style({});

export const graph_left = style({
  width: "80px",
  position: "relative",
});

export const graph_left_prefix = style({
  width: "100%",
  paddingRight: "5px",
  position: "absolute",
  margin: "0",
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  color: theme.color.blue,
  textAlign: "right",
  boxSizing: "border-box",
});

export const graph_bottom = style({
  height: "40px",
  position: "relative",
});

export const graph_bottom_prefix = style({
  position: "absolute",
  margin: "0",
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  color: theme.color.blue,
  textAlign: "center",
  boxSizing: "border-box",
  transform: "translate(50%, 0)",
});

export const graph = style({
  width: "640px",
  height: "300px",
  borderLeft: "3px solid",
  borderBottom: "3px solid",
  borderColor: theme.color.blue,
});
