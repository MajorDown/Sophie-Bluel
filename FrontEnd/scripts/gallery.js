// IMPORTS
import { getWorks, getCategories } from "./fetchData.js";
export let works = await getWorks();
export let categories = await getCategories();

// ELEMENTS DU DOM
const filterByCategory = document.getElementById("filter-by-category");
const gallery = document.querySelector(".gallery");

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

// IMPLEMENTER LA GALLERY AVEC LES WORKS (EXPORTABLE)
export async function majGallery(works) {
  try {
    gallery.innerHTML = "";
    works.map((work) => {
      gallery.appendChild(createfigure(work));
    });
  } catch (err) {
    window.alert("Problême de connection: impossible de charger la gallerie");
    console.log(err);
  }
}
await majGallery(works);

// CREER UN <BUTTON> PAR CATEGORIE EXISTANTE
export async function majFilters(categories) {
  try {
    categories.map((category) => {
      const button = document.createElement("button");
      button.innerText = category.name;
      button.setAttribute("data-id", category.id);
      button.classList.add("filter-btn");
      filterByCategory.appendChild(button);
    });
  } catch (err) {
    window.alert("Problême de connection: impossible de charger les filtres");
    console.log(err);
  }
}
await majFilters(categories);

// ACTIVER LES BUTTON
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      const dataId = button.dataset.id; // suite à data-id
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
        console.log("travaux filtrés :", works);
      }
      // SINON, RETROUVER L'ID CORESPONDANT A LA CATEGORY DU BUTTON
      else {
        // CREER UN TABLEAU CONTENANT LES TRAVAUX FILTRES
        const filteredWorks = works.filter((work) => {
          return work.categoryId === +dataId; // dataId est ici transformé en Int gràce au "+"
        });
        console.log("travaux filtrés : ", filteredWorks);
        // INTEGRER LES TRAVAUX FILTRES DANS LA GALLERIE
        filteredWorks.map((work) => {
          gallery.appendChild(createfigure(work));
        });
      }
    } catch (err) {
      window.alert("problême de connection : impossible d'activer les filtres");
      console.log(err);
    }
  });
});
