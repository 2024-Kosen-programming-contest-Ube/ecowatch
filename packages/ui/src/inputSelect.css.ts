import { style } from "@vanilla-extract/css";
import { theme } from "./theme.css";

export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  ":after": {
    position: "absolute",
    right: "15px",
    width: "10px",
    height: "7px",
    backgroundColor: theme.color.blue,
    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
    content: "",
    pointerEvents: "none",
  },
});

export const select = style({
  appearance: "none",
  width: "210px",
  height: "48px",
  padding: "6px 40px 6px 12px",
  border: "2px solid",
  borderColor: theme.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: theme.color.white,
  fontWeight: theme.font.medium,
  fontSize: "16px",
  cursor: "pointer",
});
