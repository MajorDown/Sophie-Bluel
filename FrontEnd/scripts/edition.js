import { getWorks } from "./getData.js";
const works = await getWorks();

// ELEMENTS DU DOM
const editionHeader = document.getElementById("edition-header");
const modifierBtn = document.getElementById("modifier");
const filterByCategory = document.getElementById("filter-by-category");
const editionModal = document.getElementById("edition-modal");
const modalClose = document.getElementById("modal-close");
const modalGallery = document.getElementById("modal-gallery");

// AUTHENTIFIER L'UTILISATEUR
export function isConnected() {
  if (sessionStorage.getItem("token")) return true;
  else return false;
}

// ACCEDER A L'EDITION MODE
function getEditionMode() {
  if (isConnected() === true) {
    editionHeader.classList.add("active");
    modifierBtn.classList.add("active");
    filterByCategory.classList.add("active");
    return true;
  } else return false;
}
getEditionMode();

// ACCEDER A LA MODAL EDITION
function getEditionModal() {
  console.log("click");
  editionModal.classList.add("active");
  // IMPLEMENTER LA MODAL AVEC LES TRAVAUX
  works.map((work) => {
    modalGallery.appendChild(createCard(work));
  });
}
modifierBtn.addEventListener("click", () => getEditionModal());

// FERMER LA MODAL EDITION
function closeModal() {
  editionModal.classList.remove("active");
}
modalClose.addEventListener("click", () => closeModal());

// CREER UNE CARD PAR TRAVAIL
function createCard(work) {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  const edition = document.createElement("a");
  edition.innerText = "editer";
  card.appendChild(img);
  card.appendChild(edition);
  return card;
}
