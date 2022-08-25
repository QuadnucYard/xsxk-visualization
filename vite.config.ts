import path from "path";
import { defineConfig } from "vite";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "~/": `${pathSrc}/`,
    },
  },
});
