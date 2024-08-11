import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { vars } from "../../styles/theme.css";

export const background = style({
  width: calc.subtract(vars.window.width, "20px"),
  height: calc.subtract(vars.window.height, "20px"),
  padding: "10px",
  backgroundColor: vars.color.blue, // TODO: Change color to suit status
});

export const container = style({
  width: calc.subtract(vars.window.width, "20px"),
  height: calc.subtract(vars.window.height, "20px"),
  backgroundColor: vars.color.white,
  borderRadius: "16px",
});

export const container_top = style({
  display: "flex",
  paddingTop: "58px",
  paddingLeft: "71px",
});

export const container_top_left = style({
  width: "344px",
});

export const container_top_right = style({
  width: "254px",
  marginLeft: "48px",
});

export const point_header = style({
  height: "41px",
  marginTop: "0px",
  marginBottom: "0px",
  color: vars.color.blue,
  fontWeight: vars.font.semibold,
  fontSize: "30px",
  textAlign: "center",
});

export const point = style({
  // height: "200px",
  fontSize: "200px",
  lineHeight: "200px",
  fontWeight: vars.font.medium,
  margin: "0px",
});

export const status_header = style({
  color: vars.color.blue,
  fontWeight: vars.font.semibold,
  fontSize: "16px",
  margin: "0px",
});

export const status_outer_container = style({
  width: "100%",
  height: "max-content",
  borderTop: "3px solid",
  borderBottom: "3px solid",
  borderColor: vars.color.blue, // TODO: Change color to suit status
});

export const temperature_outer_container = style([status_outer_container, { marginBottom: "5px" }]);

export const temperature_inner_container = style({
  width: "100%",
  height: "100px",
  borderTop: "3px dotted",
  borderBottom: "3px dotted",
  borderColor: vars.color.blue, // TODO: Change color to suit status
  marginTop: "3px",
  marginBottom: "3px",
});

export const weather_icon = style({
  width: "90px",
  height: "90px",
});

export const weather_inner_container = style({
  display: "flex",
  width: "100%",
  height: "90px",
  borderTop: "3px dotted",
  borderBottom: "3px dotted",
  borderColor: vars.color.blue, // TODO: Change color to suit status
  marginTop: "3px",
  marginBottom: "3px",
  paddingTop: "5px",
  paddingBottom: "5px",
});
