import { getWorks, getCategories } from "./getData.js";

// RECUPERER LES TRAVAUX
let works = await getWorks();
console.log("tableau des travaux récupéré : ", works);

// CREER UN <FIGURE> PAR TRAVAIL
function createfigure(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  const figCaption = document.createElement("figcaption");
  figCaption.innerText = work.title;
  figure.appendChild(img);
  figure.appendChild(figCaption);
  return figure;
}

// IMPLEMENTER LA GALLERY AVEC LES WORKS
const gallery = document.querySelector(".gallery");
works.map((work) => {
  gallery.appendChild(createfigure(work));
});

// RECUPERER LES CATEGORIES DANS DES BUTTON
let categories = await getCategories();
console.log("tableau des catégories récupéré : ", categories);

// CREER UN <BUTTON> PAR CATEGORIE EXISTANTE
const filterByCategory = document.getElementById("filter-by-category");
categories.map((category) => {
  const button = document.createElement("button");
  button.innerText = category.name;
  button.setAttribute("data-id", category.id);
  button.classList.add("filter-btn");
  filterByCategory.appendChild(button);
});

// ACTIVER LES BUTTON
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dataId = button.dataset.id;
    console.log("data-id du button cliqué :", dataId);
    // ACTUALISER L'APPARENCE DES BUTTON
    filterButtons.forEach((btn) => {
      btn.style.background = "none";
      btn.style.color = "#1D6154";
    });
    button.style.background = "#1D6154";
    button.style.color = "white";
    // REMETTRE A ZERO LA GALLERIE
    gallery.innerHTML = "";
    // SI LE BUTTON EST 'TOUS'
    if (dataId === "0") {
      works.map((work) => {
        gallery.appendChild(createfigure(work));
      });
      console.log("tableau des travaux filtrés :", works);
    }
    // SINON, RETROUVER L'ID CORESPONDANT A LA CATEGORY DU BUTTON
    else {
      // CREER UN TABLEAU CONTENANT LES TRAVAUX FILTRES
      const filteredWorks = works.filter((work) => {
        return work.categoryId === +dataId;
      });
      console.log("tableau des travaux filtrés : ", filteredWorks);
      // INTEGRER LES TRAVAUX FILTRES DANS LA GALLERIE
      filteredWorks.map((work) => {
        gallery.appendChild(createfigure(work));
      });
    }
  });
});
