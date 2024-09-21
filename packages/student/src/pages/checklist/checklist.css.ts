import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const list_container = style({
  width: "max-content",
  margin: "auto",
  marginTop: "50px",
});

export const checkbox_label = style({
  display: "block",
  marginTop: "8px",
  marginBottom: "8px",
  fontWeight: theme.font.medium,
  fontSize: "13px",
});

// ref: https://qiita.com/pe-ta/items/74822fd9fce24848d97e
export const checkbox = style({
  appearance: "none",
  width: "13px",
  height: "13px",
  margin: "3px 16px 3px 4px",
  verticalAlign: "-5px",
  border: "1px solid",
  borderColor: theme.color.blue,
  boxSizing: "border-box",
  position: "relative",
  ":checked": {
    backgroundColor: theme.color.blue,
  },
  selectors: {
    "&::after": {
      display: "block",
      content: "",
      position: "absolute",
      left: "4px",
      top: "1px",

      width: "2px",
      height: "6px",
      borderRight: "1px solid",
      borderBottom: "2px solid",
      borderColor: theme.color.white,
      transform: "rotate(45deg)",
    },
  },
});

export const button_container = style({
  width: "165px",
  margin: "auto",
  marginTop: "50px",
});

export const button_icon = style({
  width: "20px",
  height: "20px",
  marginLeft: "15px",
});
