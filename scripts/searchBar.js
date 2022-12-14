import { recipes } from "../data/recipes.js";
import { searchTag } from "./tags.js";
import {
  getIngredients,
  getAppareils,
  getUstensiles,
  resultIngredients,
  resultAppareils,
  resultUstensiles,
} from "./filter.js";

// BLOCK SEARCH
const searchInput = document.getElementById("searchBar-input");
export const recipesContainer = document.getElementById("recipes-container");
const errorMessage = document.getElementById("error-message");

// FUNCTION SEARCH
export function search(stringValue, newArray) {
  if (stringValue === "") return newArray;
  // Création d'un tableau vide
  let sortArray = [];
  for (let i = 0; i < newArray.length; i++) {
    // tri à l'aide d'une boucle par nom et description
    if (
      newArray[i].name.toLowerCase().includes(stringValue.toLowerCase()) ||
      newArray[i].description.toLowerCase().includes(stringValue.toLowerCase())
    ) {
      // ajout du résultat à notre nouveau tableau
      sortArray.push(newArray[i]);
    } else {
      // En cas de no answer, on cherche et affiche un ingrédients
      for (let j = 0; j < newArray[i].ingredients.length; j++) {
        if (
          newArray[i].ingredients[j].ingredient
            .toLowerCase()
            .includes(stringValue.toLowerCase())
        ) {
          sortArray.push(newArray[i]);
          break;
        }
      }
    }
  }
  return sortArray;
}

export function searchGeneral(stringValue, newArray) {
  if (stringValue === "") return newArray;
  // Création d'un tableau vide
  let sortArray = [];
  for (let i = 0; i < newArray.length; i++) {
    // tri à l'aide d'une boucle par nom et description
    if (
      newArray[i].name.toLowerCase().includes(stringValue.toLowerCase()) ||
      newArray[i].description.toLowerCase().includes(stringValue.toLowerCase())
    ) {
      // ajout du résultat à notre nouveau tableau
      sortArray.push(newArray[i]);
    } else {
      // En cas de no answer, on cherche et affiche un ingrédients
      for (let j = 0; j < newArray[i].ingredients.length; j++) {
        if (
          newArray[i].ingredients[j].ingredient
            .toLowerCase()
            .includes(stringValue.toLowerCase())
        ) {
          sortArray.push(newArray[i]);
          break;
        }
      }
      if (
        newArray[i].appliance.toLowerCase().includes(stringValue.toLowerCase())
      ) {
        sortArray.push(newArray[i]);
        break;
      }
      for (let j = 0; j < newArray[i].ustensils.length; j++) {
        if (
          newArray[i].ustensils[j]
            .toLowerCase()
            .includes(stringValue.toLowerCase())
        ) {
          sortArray.push(newArray[i]);
          break;
        }
      }
    }
  }
  return sortArray;
}

export function searchRecipe() {
  // Function qui sera appellé à partir de 3 caractères
  searchInput.addEventListener("keyup", () => {
    // if (searchInput.value.length >= 3) {
    recipesContainer.innerHTML = "";
    const stringValue = searchInput.value.toLowerCase();
    let sortArray = search(stringValue, recipes);
    // En cas de résultat erroné un message d'erreur apparait
    if (sortArray == 0) {
      errorMessage.innerHTML = `<p class="noAnswer">Aucune recettes, ingrédients, ou descriptions ne correspondent avec ce vous cherchez. Essayez : Limonade, Coco, Oignon... </p>`;
    } else {
      errorMessage.innerHTML = "";
      itemselection(searchTag(sortArray));
    }
    // }
  });
}

searchInput.addEventListener("input", searchRecipe());

// TRI DE LA LISTE
// Récupération des donnés pour filtrer et afficher la liste des recettes
export function itemselection(recipes) {
  const sortIngredients = getIngredients(recipes);
  resultIngredients.innerHTML = "";
  sortIngredients.forEach((selection) => {
    const li = `<li data-value="${selection}">${selection}</li>`;
    resultIngredients.insertAdjacentHTML("beforeend", li);
  });

  const sortAppareils = getAppareils(recipes);
  resultAppareils.innerHTML = "";
  sortAppareils.forEach((selection) => {
    const li = `<li data-value="${selection}">${selection}</li>`;
    resultAppareils.insertAdjacentHTML("beforeend", li);
  });

  const sortUstensiles = getUstensiles(recipes);
  resultUstensiles.innerHTML = "";
  sortUstensiles.forEach((selection) => {
    const li = `<li data-value="${selection}">${selection}</li>`;
    resultUstensiles.insertAdjacentHTML("beforeend", li);
  });
}
