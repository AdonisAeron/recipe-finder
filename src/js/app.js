import { loadSearchPage } from "./search.js";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadSearchPage();
});
