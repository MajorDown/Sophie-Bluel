// ELEMENTS DU DOM

// CREER UN <FIGURE> PAR TRAVAIL
export function createfigure(work) {
  const figure = document.createElement("figure");
  figure.id = "figure" + work.id;
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
export function majGallery(listOfWorks) {
  const gallery = document.querySelector(".gallery");
  try {
    gallery.innerHTML = "";
    listOfWorks.map((work) => {
      gallery.appendChild(createfigure(work));
    });
  } catch (err) {
    window.alert("Problême de connection: impossible de charger la gallerie");
    console.log(err);
  }
}

// CREER UN <BUTTON> PAR CATEGORIE EXISTANTE
export function majFilters(listOfCategories) {
  const filterByCategory = document.getElementById("filter-by-category");
  try {
    listOfCategories.map((category) => {
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

// ACTIVER LES FILTRES
export function setFiltersRules(listOfWorks) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const gallery = document.querySelector(".gallery");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      try {
        const dataId = button.dataset.id;
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
          listOfWorks.map((work) => {
            gallery.appendChild(createfigure(work));
          });
          console.log("travaux filtrés :", listOfWorks);
        }
        // SINON, RETROUVER L'ID CORESPONDANT A LA CATEGORY DU BUTTON
        else {
          // CREER UN TABLEAU CONTENANT LES TRAVAUX FILTRES
          const filteredWorks = listOfWorks.filter((work) => {
            return work.categoryId === +dataId; //dataId est ici transformé en Int gràce au "+"
          });
          console.log("travaux filtrés : ", filteredWorks);
          // INTEGRER LES TRAVAUX FILTRES DANS LA GALLERIE
          filteredWorks.map((work) => {
            gallery.appendChild(createfigure(work));
          });
        }
      } catch (err) {
        window.alert(
          "problême de connection : impossible d'activer les filtres"
        );
        console.log(err);
      }
    });
  });
}
