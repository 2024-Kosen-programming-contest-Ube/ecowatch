import { theme } from "@ecowatch/ui";
import { style } from "@vanilla-extract/css";

export const page_ground = style({
  backgroundColor: theme.color.white,
});

export const menu_container = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 300px)",
  gap: "30px",
  maxWidth: "630px", // 300 * 2 + 30
  margin: "auto",
  marginTop: "70px",
  "@media": {
    "screen and (max-width: 630px)": {
      maxWidth: "330px", // 300 * 1 + 30
    },
  },
});

export const menu_item = style({
  appearance: "none",
  width: "300px",
  height: "100px",
  backgroundColor: theme.color.white,
  border: "1px solid",
  borderRadius: "16px",
  borderColor: theme.color.blue,
  fontWeight: theme.font.semibold,
  fontSize: "20px",
});
