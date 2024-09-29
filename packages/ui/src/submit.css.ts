import { style } from "@vanilla-extract/css";
import { theme } from "./theme.css";

export const submit = style({
  appearance: "none",
  width: "210px",
  height: "48px",
  padding: "6px 12px 6px 12px",
  margin: "auto",
  border: "2px solid",
  borderColor: theme.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: theme.color.white,
  color: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "20px",
  boxSizing: "border-box",

  ":disabled": {
    borderColor: theme.color.gray,
    color: theme.color.gray,
  },
});
