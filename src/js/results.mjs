import { loadHeaderFooter } from "./utils.mjs";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

let currentPage = 1;
const resultsPerPage = 10; // Number of results per page
let totalResults = 0;

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const searchCriteria = JSON.parse(localStorage.getItem("searchCriteria"));
  if (searchCriteria) {
    await fetchAndDisplayResults(searchCriteria, currentPage);
  }

  document.getElementById("prevPage").addEventListener("click", () => changePage(-1));
  document.getElementById("nextPage").addEventListener("click", () => changePage(1));
});

async function fetchAndDisplayResults(searchCriteria, page) {
  let results;
  switch (searchCriteria.type) {
    case "ingredient":
      results = await searchByIngredient(searchCriteria.value, page);
      break;
    case "cuisine":
      results = await searchByCuisine(searchCriteria.value, page);
      break;
    case "mealType":
      results = await searchByMealType(searchCriteria.value, page);
      break;
    case "random":
      results = await getRandomRecipe();
      break;
  }
  console.log(`Total Results: ${totalResults}, Current Page: ${currentPage}, Results Per Page: ${resultsPerPage}`);
  displayResults(results);
  updatePaginationButtons();
}

async function searchByIngredient(ingredient, page) {
  const offset = (page - 1) * resultsPerPage;
  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=${resultsPerPage}&offset=${offset}&apiKey=${apiKey}`);
  const data = await response.json();
  totalResults = data.length > 0 ? response.headers.get("x-total-results") : 0;
  return data;
}

async function searchByCuisine(cuisine, page) {
  const offset = (page - 1) * resultsPerPage;
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${resultsPerPage}&offset=${offset}&apiKey=${apiKey}`);
  const data = await response.json();
  totalResults = data.totalResults || 0;
  return data.results;
}

async function searchByMealType(mealType, page) {
  const offset = (page - 1) * resultsPerPage;
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&number=${resultsPerPage}&offset=${offset}&apiKey=${apiKey}`);
  const data = await response.json();
  totalResults = data.totalResults || 0;
  return data.results;
}

async function getRandomRecipe() {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=${resultsPerPage}&apiKey=${apiKey}`);
  const data = await response.json();
  totalResults = resultsPerPage; // random API doesn"t support total results, so use the number per page
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

function changePage(direction) {
  currentPage += direction;
  const searchCriteria = JSON.parse(localStorage.getItem("searchCriteria"));
  if (searchCriteria) {
    fetchAndDisplayResults(searchCriteria, currentPage);
  }
}

function updatePaginationButtons() {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.style.display = currentPage > 1 ? "block" : "none";
  nextButton.style.display = (currentPage * resultsPerPage) < totalResults ? "block" : "none";
  console.log(`Prev Button Display: ${prevButton.style.display}, Next Button Display: ${nextButton.style.display}`);
}

window.viewRecipe = function(id) {
  window.location.href = `recipe-details.html?id=${id}`;
}
