import { getLocalStorage, loadHeaderFooter, removeFavorite } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  displayFavoriteRecipes();
});

export function displayFavoriteRecipes() {
  const favorites = getLocalStorage("favorites") || [];
  const resultsContainer = document.getElementById("favorites");
  
  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";

  if (favorites.length === 0) {
    resultsContainer.innerHTML = "<p>No favorite recipes found.</p>";
    return;
  }

  favorites.forEach(async (id) => {
    const recipe = await fetchRecipeById(id);
    const recipeCard = `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
        <button onclick="removeFavoriteAndRefresh(${recipe.id})">Remove from Favorites</button>
      </div>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", recipeCard);
  });
}

async function fetchRecipeById(id) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
  const data = await response.json();
  return data;
}

window.viewRecipe = function(id) {
  window.location.href = `recipe-details.html?id=${id}`;
}

window.removeFavoriteAndRefresh = function(id) {
  removeFavorite(id);
  displayFavoriteRecipes();
}
