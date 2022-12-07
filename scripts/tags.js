import { recipes } from "../data/recipes.js";
import { displayRecipe } from "./main.js";
import { itemselection, search, recipesContainer } from "./searchBar.js";

const searchInput = document.getElementById("searchBar-input");

// FILTRAGE
function sortIngredients(recipes) {
  const ul = document.getElementById("selection-ingredients");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    let resultRecipe = search(searchInput.value, recipes);
    const sortRecipe = resultRecipe.filter((recipe) =>
      // La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie.
      recipe.ingredients.some((el) =>
        el.ingredient.includes(e.target.dataset.value)
      )
    );
    // Trie de chaque filtre en fonction de la valeur choisi, searchTag renvoie un tableau trier
    itemselection(searchTag(sortRecipe));
  });
}

function sortAppareils(recipes) {
  const ul = document.getElementById("selection-appareils");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    let resultRecipe = search(searchInput.value, recipes);
    const sortRecipe = resultRecipe.filter((element) =>
      element.appliance.includes(e.target.dataset.value)
    );
    itemselection(searchTag(sortRecipe));
  });
}

function sortUstensiles(recipes) {
  const ul = document.getElementById("selection-ustensiles");
  ul.addEventListener("click", (e) => {
    recipesContainer.innerHTML = "";
    let resultRecipe = search(searchInput.value, recipes);
    const sortRecipe = resultRecipe.filter((element) =>
      element.ustensils.includes(e.target.dataset.value)
    );
    itemselection(searchTag(sortRecipe));
  });
}

sortIngredients(recipes);
sortAppareils(recipes);
sortUstensiles(recipes);

// Fonction qui a en paramètre sortRecipe, récupération des tags, et pour chaque tag on appel la fonction search()
// En premier paramètre la valeur du texte, ensuite la liste des ingrédients trié et affiché
export function searchTag(sortRecipe) {
  let tags = document.querySelectorAll(".tag");
  let sortArray = sortRecipe;
  tags.forEach((tag) => (sortArray = search(tag.textContent, sortArray)));
  displayRecipe(sortArray);
  return sortArray;
}
