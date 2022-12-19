import { recipes } from "../data/recipes.js";
import { searchTag } from "./tags.js";
import { recipesContainer, itemselection, search } from "./searchBar.js";

// BLOCK FILTER
const btn = document.querySelectorAll(".filter-button");
const tags = document.getElementById("filter-tag");

// BOUTON FILTER
const btnIngredients = document.querySelector("#ingredients");
const btnAppareils = document.querySelector("#appareils");
const btnUstensiles = document.querySelector("#ustensiles");

// INPUT
const inputIngredients = document.querySelector("#ingredients .filter-input");
const inputAppareils = document.querySelector("#appareils .filter-input");
const inputUstensiles = document.querySelector("#ustensiles .filter-input");

// SELECT ITEM IN RECIPE
// ul (ingrédients, appareils, ustensiles)
export const resultIngredients = document.getElementById(
  "selection-ingredients"
);
export const resultAppareils = document.getElementById("selection-appareils");
export const resultUstensiles = document.getElementById("selection-ustensiles");

// SELECTIONS
// Fonction qui tri chaque liste par ordre alphabétique
const selectionIngredients = getIngredients(recipes);
const selectionAppareils = getAppareils(recipes);
const selectionUstensiles = getUstensiles(recipes);

const searchInput = document.getElementById("searchBar-input");

// FILTER
// Affichage et filtrage (avec la func searchresult) des listes.
btn[0].addEventListener("click", () => {
  btnIngredients.classList.toggle("active");
  btnAppareils.classList.remove("active");
  btnUstensiles.classList.remove("active");
  inputIngredients.focus();
  searchresult(
    inputIngredients,
    btnIngredients,
    resultIngredients,
    selectionIngredients
  );
});

btn[1].addEventListener("click", () => {
  btnAppareils.classList.toggle("active");
  btnIngredients.classList.remove("active");
  btnUstensiles.classList.remove("active");
  inputAppareils.focus();
  searchresult(
    inputAppareils,
    btnAppareils,
    resultAppareils,
    selectionAppareils
  );
});

btn[2].addEventListener("click", () => {
  btnUstensiles.classList.toggle("active");
  btnIngredients.classList.remove("active");
  btnAppareils.classList.remove("active");
  inputUstensiles.focus();
  searchresult(
    inputUstensiles,
    btnUstensiles,
    resultUstensiles,
    selectionUstensiles
  );
});

// RECUPERATION DES DONNÉES
// indexOf affiche le premier index
function request(value, index, self) {
  // self affiche les items qui sont en commun avec la valeur sélectionné.
  return self.indexOf(value) === index;
}

// Trier par ordre alphabétique
export function getIngredients(recipes) {
  const list = [];
  recipes?.forEach((recipe) => {
    recipe.ingredients.forEach((el) => list.push(el.ingredient));
  });
  const sortIngredients = list.filter(request);
  sortIngredients.sort((a, b) => a.localeCompare(b));
  return sortIngredients;
}

export function getAppareils(recipes) {
  const list = [];
  recipes?.forEach((recipe) => {
    list.push(recipe.appliance);
  });
  const sortAppareils = list.filter(request);
  sortAppareils.sort((a, b) => a.localeCompare(b));
  return sortAppareils;
}

export function getUstensiles(recipes) {
  const list = [];
  recipes?.forEach((recipe) => {
    recipe.ustensils.forEach((el) => list.push(el));
  });
  const sortUstensiles = list.filter(request);
  sortUstensiles.sort((a, b) => a.localeCompare(b));
  return sortUstensiles;
}

// DISPLAY ITEMS
// Affichage des items de chaque filter

function addList() {
  resultIngredients.innerHTML = "";
  selectionIngredients.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    resultIngredients.insertAdjacentHTML("beforeend", li);
  });

  resultAppareils.innerHTML = "";
  selectionAppareils.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    resultAppareils.insertAdjacentHTML("beforeend", li);
  });

  resultUstensiles.innerHTML = "";
  selectionUstensiles.forEach((el) => {
    const li = `<li data-value="${el}">${el}</li>`;
    resultUstensiles.insertAdjacentHTML("beforeend", li);
  });
}

// SEARCH FILTER INPUT
// Trie des items et affichage dans l'input du block filter

function searchresult(input, btn, result, selection) {
  input.addEventListener("keyup", () => {
    if (input.value.length > 0) {
      btn.classList.add("active");
      result.innerHTML = "";
      let valueInput = input.value[0].toUpperCase() + input.value.slice(1);
      let sortList = selection.filter(
        (option) =>
          option.includes(valueInput) ||
          option.includes(input.value.toLowerCase())
      );
      for (let option of sortList) {
        result.insertAdjacentHTML(
          "beforeend",
          `<li data-value="${option}">${option}</li>`
        );
      }
      // Sinon tu affiches la liste entière
    } else {
      addList(selection);
    }
  });
}

// TAGS

function displayTag(e) {
  // Récupération valeur li sélectionné dans la liste
  // const elementParent = document.querySelector(`[data-value="${e}"]`);
  const span = document.createElement("span");

  span.classList.add("tag");
  // récupération de la valeur du li sélectionné
  span.textContent = e.target.dataset.value;
  span.insertAdjacentHTML(
    "beforeend",
    `<span class="close-tag" data-name="close"><img  src="../public/assets/svg/x-circle.svg" alt="Btn fermeture"/></span>`
  );
  tags.appendChild(span);

  // Colorimétrie grace a l'ID
  if (e.currentTarget.id === "selection-ingredients") {
    span.style.background = "#3282f7";
    span.setAttribute("data-category", "ingredient");

    inputIngredients.value = "";
    btnIngredients.classList.remove("active");
  } else if (e.currentTarget.id === "selection-appareils") {
    span.style.background = "#68d9a4";
    span.setAttribute("data-category", "appareils");

    inputAppareils.value = "";
    btnAppareils.classList.remove("active");
  } else if (e.currentTarget.id === "selection-ustensiles") {
    span.style.background = "#ed6454";
    span.setAttribute("data-category", "ustensiles");

    inputUstensiles.value = "";
    btnUstensiles.classList.remove("active");
  } else {
    console.log("Error");
  }

  closeTag();
}

// CLOSE TAGS
// Suppression valeur parent et textContent
// La galerie est effacé, et les fonctions addlist et searchtag rappelées
function closeTag() {
  const closeTag = document.querySelectorAll(".close-tag");
  closeTag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      // On vient enlever la valeur du parent li
      e.target.parentNode.parentNode.remove();
      e.stopPropagation();
      // Dans notre nouvelle liste on vient enlever le contenu du texte
      NewList.delete(e.target.parentNode.parentElement.textContent);
      if (e.currentTarget.dataset.name == "close") {
        recipesContainer.innerHTML = "";
        let resultRecipe = search(searchInput.value, recipes);
        itemselection(searchTag(resultRecipe));
      }
    });
  });
}

// NOUVELLE LISTE DE TAG
// Un objet Set permet de stocker un ensemble de valeurs uniques de n'importe quel type,

let NewList = new Set();

function valueTag(result) {
  result.addEventListener("click", (e) => {
    // Function qui permet d'afficher l'élement cliqué si elle n'a pas la valeur parent
    if (!NewList.has(e.target.dataset.value)) {
      // tags.innerHTML = "";
      displayTag(e);
      NewList.add(e.target.dataset.value);
    }
    // for (let tag of NewList) {
    //   displayTag(tag);
    // }
  });
}

// APPEL DES FONCTIONS
addList();

valueTag(resultIngredients);
valueTag(resultAppareils);
valueTag(resultUstensiles);
