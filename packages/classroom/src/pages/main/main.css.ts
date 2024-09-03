import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const background = style({
  width: calc.subtract(theme.window.width, "20px"),
  height: calc.subtract(theme.window.height, "20px"),
  padding: "10px",
  backgroundColor: theme.color.blue, // TODO: Change color to suit status
});

export const container = style({
  width: calc.subtract(theme.window.width, "20px"),
  height: calc.subtract(theme.window.height, "20px"),
  backgroundColor: theme.color.white,
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
  color: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "30px",
  textAlign: "center",
});

export const point = style({
  fontSize: "200px",
  lineHeight: "200px",
  fontWeight: theme.font.medium,
  margin: "0px",
  marginTop: "-20px",
  textAlign: "right",
});

export const button_container = style({
  display: "flex",
  justifyContent: "space-between",
});

export const button = style({
  height: "44px",
  width: "160px",
  padding: "0px",
  borderRadius: "56px",
  border: "2px solid",
  borderBottom: "6px solid",
  backgroundColor: theme.color.white,
  borderColor: theme.color.blue,
  fontSize: "20px",
  fontWeight: theme.font.semibold,
  boxSizing: "content-box",
});

export const status_header = style({
  color: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "16px",
  margin: "0px",
});

export const status_outer_container = style({
  width: "100%",
  height: "max-content",
  borderTop: "3px solid",
  borderBottom: "3px solid",
  borderColor: theme.color.blue, // TODO: Change color to suit status
});

export const temperature_outer_container = style([status_outer_container, { marginBottom: "5px" }]);

export const temperature_inner_container = style({
  width: "100%",
  height: "100px",
  borderTop: "3px dotted",
  borderBottom: "3px dotted",
  borderColor: theme.color.blue, // TODO: Change color to suit status
  marginTop: "3px",
  marginBottom: "3px",
});

export const temperature_humidity = style({
  display: "flex",
  marginTop: "4px",
});

export const temperature_humidity_integer = style({
  margin: 0,
  fontWeight: theme.font.medium,
  fontSize: "80px",
  lineHeight: "80px",
});

export const temperature_humidity_symbol = style({
  margin: 0,
  marginTop: "6px",
  fontWeight: theme.font.medium,
  fontSize: "40px",
  lineHeight: "40px",
});

export const temperature_humidity_decimal = style({
  margin: 0,
  fontWeight: theme.font.medium,
  fontSize: "30px",
  lineHeight: "30px",
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
  borderColor: theme.color.blue, // TODO: Change color to suit status
  marginTop: "3px",
  marginBottom: "3px",
  paddingTop: "5px",
  paddingBottom: "5px",
});

export const discomfort_index = style({
  margin: "auto",
  marginTop: "0",
  fontWeight: theme.font.medium,
  fontSize: "80px",
  lineHeight: "80px",
});

export const hint_container = style({
  width: "750px",
  margin: "auto",
});

export const hint_header = style({
  margin: "0px",
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  color: theme.color.blue,
});

export const hint = style({
  width: "100%",
  height: "60px",
  margin: "0px",
  fontWeight: theme.font.medium,
  fontSize: "20px",
  lineHeight: "60px",
  borderTop: "2px solid",
  borderBottom: "2px solid",
  borderColor: theme.color.blue,
});
