import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  root: './src',
  base: './',
  build: {
    outDir: '../dist'
  },

  plugins: [
    paths()
  ]
});