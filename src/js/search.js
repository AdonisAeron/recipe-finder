import { qs, setLocalStorage } from "./utils.mjs";

export function loadSearchPage() {
  const app = qs("#app");
  app.innerHTML = `
      <div>
        <label for="ingredient">Search by Ingredient:</label>
        <input type="text" id="ingredient" name="ingredient">
        <button id="search-ingredient">Search</button>
      </div>
      <div>
        <label for="cuisine">Select Cuisine:</label>
        <select id="cuisine" name="cuisine">
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
        </select>
        <button id="search-cuisine">Search</button>
      </div>
      <div>
        <label for="meal-type">Select Meal Type:</label>
        <select id="meal-type" name="meal-type">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <button id="search-meal-type">Search</button>
      </div>
      <button id="random-recipe">Get Random Recipe</button>
      <a href="favorites.html">Favorites</a>
    `;

    qs("#search-ingredient").addEventListener("click", () => {
      const ingredient = qs("#ingredient").value;
      setLocalStorage("searchCriteria", { type: "ingredient", value: ingredient });
      window.location.href = "../page/results.html";
    });
  
    qs("#search-cuisine").addEventListener("click", () => {
      const cuisine = qs("#cuisine").value;
      setLocalStorage("searchCriteria", { type: "cuisine", value: cuisine });
      window.location.href = "../page/results.html";
    });
  
    qs("#search-meal-type").addEventListener("click", () => {
      const mealType = qs("#meal-type").value;
      setLocalStorage("searchCriteria", { type: "mealType", value: mealType });
      window.location.href = "../page/results.html";
    });
  
    qs("#random-recipe").addEventListener("click", () => {
        setLocalStorage("searchCriteria", { type: "random" });
      window.location.href = "../page/results.html";
    });
  }