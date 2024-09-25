import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@providers": `${path.resolve(__dirname, "./src/providers/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@shared": `${path.resolve(__dirname, "./src/components/shared/")}`,
      "@ui": `${path.resolve(__dirname, "./src/components/ui/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@public": `${path.resolve(__dirname, "./public/")}`,
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
