import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  publicDir: './',
  plugins: [
    paths()
  ]
});