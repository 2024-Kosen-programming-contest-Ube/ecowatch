import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  ":after": {
    position: "absolute",
    right: "15px",
    width: "10px",
    height: "7px",
    backgroundColor: vars.color.blue,
    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
    content: "",
    pointerEvents: "none",
  },
});

export const select = style({
  appearance: "none",
  minWidth: "210px",
  height: "48px",
  padding: ".4em calc(.8em + 30px) .4em .8em",
  border: "2px solid",
  borderColor: vars.color.blue,
  borderRadius: "12px",
  outline: "0",
  backgroundColor: vars.color.white,
  fontWeight: vars.font.medium,
  fontSize: "16px",
  cursor: "pointer",
});
