import { recipes } from "../data/recipes";
import { display } from "./display";
import "../sass/main.scss";

// AFFICHAGE GALLERY
export function displayRecipe(recipes) {
  recipes?.forEach((recipe) => display(recipe));
  console.log(recipes);
}

function init() {
  displayRecipe(recipes);
}
init();
