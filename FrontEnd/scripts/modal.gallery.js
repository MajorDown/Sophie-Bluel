// IMPORTS
import { deleteWork } from "./fetchData.js";

// ELEMENTS DU DOM
const modalGallery = document.getElementById("modal-gallery");

// CREER UNE CARD PAR TRAVAIL
export function createCard(work) {
  const card = document.createElement("div");
  card.classList.add("card");
  const bin = document.createElement("img");
  bin.classList.add("bin");
  bin.src = "./assets/icons/binIcon.png";
  bin.alt = "supprimer";
  bin.addEventListener("click", async (event) => {
    const isDeleted = await suppressWork(event, work.id);
    if (isDeleted === true) {
      card.remove();
    }
  });
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  const edition = document.createElement("a");
  edition.innerText = "editer";
  card.appendChild(bin);
  card.appendChild(img);
  card.appendChild(edition);
  return card;
}

// ACTUALISER LA GALLERY AVEC LES TRAVAUX
export function majModalgallery(works) {
  try {
    modalGallery.innerHTML = "";
    works.map((work) => {
      modalGallery.appendChild(createCard(work));
    });
  } catch (err) {
    window.alert("Problême de connection : impossible de charger la gallerie");
    console.log(err);
  }
}

// SUPPRIMER UN WORK
async function suppressWork(event, id) {
  if (
    window.confirm("Voulez-vous vraiment supprimer ce projet de la gallerie ?")
  ) {
    event.preventDefault();
    try {
      const deleteResponse = await deleteWork(id);
      console.log(
        "Requète DELETE envoyé. Réponse du serveur : ",
        deleteResponse
      );
      return deleteResponse.ok;
    } catch (err) {
      window.alert(
        "Problême de connection : impossible de supprimer le projet"
      );
      console.log(err);
    }
  }
}
