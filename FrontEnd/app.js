// IMPORTS
import { getWorks, getCategories } from "./scripts/fetchData.js";
import { majFilters, majGallery, setFiltersRules } from "./scripts/gallery.js";
import { manageEditionMode } from "./scripts/authentification.js";
import {
  closeEditionModal,
  openAddPhotoModal,
  openEditionModal,
} from "./scripts/edition.js";
import { majModalgallery } from "./scripts/modal.gallery.js";
import {
  cancelUploadedPhoto,
  createNewWork,
  createOptionsByCategories,
  previewPhoto,
  returnToGalleryModal,
} from "./scripts/modal.addPhoto.js";

// ASYNCHRONES
let works = await getWorks();
let categories = await getCategories();

// MAJ DE LA GALLERIE
majGallery(works);

// MAJ DES FILTRES
majFilters(categories);

// ATTRIBUER UNE FONCTION A CHAQUE FILTRE
setFiltersRules(works);

// GERER L'ACCES AU MODE EDITION
manageEditionMode();

// OUVRIR LA MODALE D'EDITION
majModalgallery(works);
const modifierBtn = document.getElementById("modifier");
modifierBtn.addEventListener("click", () => {
  openEditionModal();
});

// FERMER LA MODALE D'EDITION EN CLIQUANT SUR LA CROIX
const modalClose = document.querySelector(".modal-close");
modalClose.addEventListener("click", closeEditionModal);

// FERMER LA MODALE D'EDITION EN CLIQUANT SUR L'OVERLAY
const overlay = document.getElementById("overlay");
overlay.addEventListener("click", () => closeEditionModal());

// ACCEDER A LA MODAL "AJOUTER UN PROJET"
const addPhotoModalBtn = document.getElementById("add-photo-modal-btn");
addPhotoModalBtn.addEventListener("click", () => {
  openAddPhotoModal();
  createOptionsByCategories(categories);
});

// REVENIR A LA MODAL GALLERY
const goBack = document.getElementById("goBack");
goBack.addEventListener("click", () => {
  cancelUploadedPhoto();
  returnToGalleryModal();
});

// PREVISUALISER LA PHOTO UPLOADE
const addPhotoBtn = document.getElementById("addPhotoBtn");
addPhotoBtn.addEventListener("change", previewPhoto);

// ENVOYER LE FORMULAIRE POUR UN NOUVEAU WORK
const newWorkForm = document.getElementById("new-work-form");
newWorkForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await createNewWork();
  works = await getWorks(); // actualisation des travaux
  cancelUploadedPhoto();
  returnToGalleryModal();
  majModalgallery(works);
  majGallery(works);
});
