// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        results: resolve(__dirname, "src/page/results.html"),
        recipeDetails: resolve(__dirname, "src/page/recipe-details.html"),
        favorites: resolve(__dirname, "src/page/favorites.html"),
      },
    },
  },
});
