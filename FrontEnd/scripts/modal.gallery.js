// IMPORTS
import { getWorks, deleteWork } from "./fetchData.js";

// ASYNCHRONES
const works = await getWorks();

// ELEMENTS DU DOM
const modalGallery = document.getElementById("modal-gallery");

// ACTUALISER LA GALLERY AVEC LES TRAVAUX
export function majModalgallery() {
  works.map((work) => {
    modalGallery.appendChild(createCard(work));
  });
}

// CREER UNE CARD PAR TRAVAIL
export function createCard(work) {
  const card = document.createElement("div");
  card.classList.add("card");
  const bin = document.createElement("img");
  bin.classList.add("bin");
  bin.src = "./assets/icons/binIcon.png";
  bin.alt = "supprimer";
  bin.addEventListener("click", (event) => suppressWork(event, work.id));
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

// SUPPRIMER UN WORK
async function suppressWork(event, id) {
  if (
    window.confirm("Voulez-vous vraiment supprimer ce projet de la gallerie ?")
  ) {
    event.preventDefault();
    const suppression = await deleteWork(id);
    console.log(suppression);
    return;
  }
}
