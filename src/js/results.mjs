import { loadHeaderFooter } from "./utils.mjs";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
const resultsPerPage = 100; // Adjust this number based on API limits and performance considerations

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const searchCriteria = JSON.parse(localStorage.getItem("searchCriteria"));
  if (searchCriteria) {
    await fetchAndDisplayResults(searchCriteria);
  }
});

async function fetchAndDisplayResults(searchCriteria) {
  let results;
  const { type, value, intolerance } = searchCriteria;
  switch (type) {
    case "ingredient":
      results = await searchByIngredient(value, intolerance);
      break;
    case "cuisine":
      results = await searchByCuisine(value, intolerance);
      break;
    case "mealType":
      results = await searchByMealType(value, intolerance);
      break;
    case "random":
      results = await getRandomRecipe(intolerance);
      break;
  }
  displayResults(results);
}

async function searchByIngredient(ingredient, intolerance) {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&number=${resultsPerPage}&intolerances=${intolerance}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.results;
}

async function searchByCuisine(cuisine, intolerance) {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${resultsPerPage}&intolerances=${intolerance}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.results;
}

async function searchByMealType(mealType, intolerance) {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&number=${resultsPerPage}&intolerances=${intolerance}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.results;
}

async function getRandomRecipe(intolerance) {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=${resultsPerPage}&intolerances=${intolerance}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.recipes;
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = results.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
    </div>
  `).join("");
}

window.viewRecipe = function(id) {
  window.location.href = `recipe-details.html?id=${id}`;
}
