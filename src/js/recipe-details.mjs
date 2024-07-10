import { qs, getParam, loadHeaderFooter } from "./utils.mjs";
import { saveFavorite } from "./favorites.mjs";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

document.addEventListener("DOMContentLoaded", async () => {
  loadHeaderFooter();
  const recipeId = getParam("id");
  if (recipeId) {
    const recipe = await fetchRecipeDetails(recipeId);
    displayRecipeDetails(recipe);
  }
});

async function fetchRecipeDetails(id) {
  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe details: ${response.statusText}`);
  }
  return await response.json();
}

function displayRecipeDetails(recipe) {
  const detailsContainer = qs("#recipe-details");
  detailsContainer.innerHTML = `
    <div class="recipe-detail-card">
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p><strong>Summary:</strong> ${recipe.summary}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("")}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>${recipe.instructions}</p>
      <button id="save-favorite">Save to Favorites</button>
    </div>
  `;

  qs("#save-favorite").addEventListener("click", () => {
    saveFavorite(recipe.id);
    alert("Recipe saved to favorites!");
  });
}
