// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Helper to get URL parameter values
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");

  headerElement.innerHTML = headerTemplate;
  footerElement.innerHTML = footerTemplate;

  document.getElementById("random-recipe-nav").addEventListener("click", async (event) => {
    event.preventDefault();
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const data = await response.json();
    const recipeId = data.recipes[0].id;
    window.location.href = `/page/recipe-details.html?id=${recipeId}`;
  });
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  })
  const main = qs("main");
  main.prepend(alert);

  if(scroll)
    window.scrollTo(0, 0);

  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function saveFavorite(recipeId) {
  const favorites = getLocalStorage("favorites") || [];
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    setLocalStorage("favorites", favorites);
    alertMessage("Recipe saved to favorites!");
  }
}

export function removeFavorite(recipeId) {
  let favorites = getLocalStorage("favorites") || [];
  favorites = favorites.filter(id => id !== recipeId);
  setLocalStorage("favorites", favorites);
  alertMessage("Recipe removed from favorites!");
}