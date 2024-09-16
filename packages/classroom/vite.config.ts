import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_DEV_CONFIG_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/sensor": {
          target: env.VITE_DEV_CONFIG_SENSOR_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sensor/, ""),
        },
      },
    },
  };
});
