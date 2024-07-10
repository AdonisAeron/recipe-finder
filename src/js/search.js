export function loadSearchPage() {
  const app = document.getElementById("app");
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
}
