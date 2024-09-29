import { createGlobalTheme } from "@vanilla-extract/css";

export const theme = createGlobalTheme(":root", {
  color: {
    blue: "#32bbf5",
    red: "#ff6565",
    green: "#9bfc6e",
    yellow: "#f6fa5c",
    white: "#ffffff",
    gray: "#8a8a8a",
  },
  window: {
    width: "800px",
    height: "480px",
  },
  font: {
    medium: "500",
    semibold: "600",
  },
});
