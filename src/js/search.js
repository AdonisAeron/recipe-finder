import { qs, setLocalStorage } from "./utils.mjs";

export function loadSearchPage() {
  const app = qs("#app");
  app.innerHTML = `
    <div class="content-box">
      <h1>Welcome to Recipe Finder</h1>
      <div class="search-section">
        <div>
          <label for="ingredient">Search by Ingredient:</label>
          <input type="text" id="ingredient" name="ingredient">
          <button id="search-ingredient">Search</button>
        </div>
        <div>
          <label for="cuisine">Select Cuisine:</label>
          <select id="cuisine" name="cuisine">
            <option value="African">African</option>
            <option value="Asian">Asian</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Cajun">Cajun</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern European</option>
            <option value="European">European</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Jewish">Jewish</option>
            <option value="Korean">Korean</option>
            <option value="Latin American">Latin American</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
          <button id="search-cuisine">Search</button>
        </div>
        <div>
          <label for="meal-type">Select Meal Type:</label>
          <select id="meal-type" name="meal-type">
            <option value="main course">Main Course</option>
            <option value="side dish">Side Dish</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="bread">Bread</option>
            <option value="breakfast">Breakfast</option>
            <option value="soup">Soup</option>
            <option value="beverage">Beverage</option>
            <option value="sauce">Sauce</option>
            <option value="marinade">Marinade</option>
            <option value="fingerfood">Fingerfood</option>
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
          </select>
          <button id="search-meal-type">Search</button>
        </div>
        <div>
          <label for="intolerance">Select Intolerance:</label>
          <select id="intolerance" name="intolerance">
            <option value="">None</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="grain">Grain</option>
            <option value="peanut">Peanut</option>
            <option value="seafood">Seafood</option>
            <option value="sesame">Sesame</option>
            <option value="shellfish">Shellfish</option>
            <option value="soy">Soy</option>
            <option value="sulfite">Sulfite</option>
            <option value="tree nut">Tree Nut</option>
            <option value="wheat">Wheat</option>
          </select>
        </div>
        <button id="random-recipe">Get Random Recipe</button>
        <a href="favorites.html">Favorites</a>
      </div>
    </div>
  `;

  qs("#search-ingredient").addEventListener("click", () => {
    const ingredient = qs("#ingredient").value;
    const intolerance = qs("#intolerance").value;
    setLocalStorage("searchCriteria", { type: "ingredient", value: ingredient, intolerance });
    window.location.href = "../page/results.html";
  });

  qs("#search-cuisine").addEventListener("click", () => {
    const cuisine = qs("#cuisine").value;
    const intolerance = qs("#intolerance").value;
    setLocalStorage("searchCriteria", { type: "cuisine", value: cuisine, intolerance });
    window.location.href = "../page/results.html";
  });

  qs("#search-meal-type").addEventListener("click", () => {
    const mealType = qs("#meal-type").value;
    const intolerance = qs("#intolerance").value;
    setLocalStorage("searchCriteria", { type: "mealType", value: mealType, intolerance });
    window.location.href = "../page/results.html";
  });

  qs("#random-recipe").addEventListener("click", () => {
    const intolerance = qs("#intolerance").value;
    setLocalStorage("searchCriteria", { type: "random", intolerance });
    window.location.href = "../page/results.html";
  });
}
