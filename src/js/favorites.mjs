import { qs, getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  loadHeaderFooter();
  await displayFavoriteRecipes();
});

async function displayFavoriteRecipes() {
  const favoriteIds = getLocalStorage("favorites") || [];
  const favoritesContainer = qs("#favorites");

  if (favoriteIds.length > 0) {
    const favoriteRecipes = await Promise.all(favoriteIds.map(fetchRecipeById));
    favoritesContainer.innerHTML = favoriteRecipes.map(recipe => `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
      </div>
    `).join("");
  } else {
    favoritesContainer.innerHTML = "<p>No favorite recipes saved.</p>";
  }
}

async function fetchRecipeById(id) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.statusText}`);
  }
  return await response.json();
}

window.viewRecipe = function(id) {
  window.location.href = `/page/recipe-details.html?id=${id}`;
}

export function saveFavorite(recipeId) {
  const favorites = getLocalStorage("favorites") || [];
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    setLocalStorage("favorites", favorites);
  }
}
