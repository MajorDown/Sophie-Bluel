// IMPORTS
import { manageEditionMode } from "./authentification.js";
import { majModalgallery } from "./modal.gallery.js";
import { majGallery } from "./gallery.js";
import {
  previewPhoto,
  createOptionsByCategories,
  returnToGalleryModal,
  createNewWork,
} from "./modal.addPhoto.js";

// ELEMENTS DU DOM
const modifierBtn = document.getElementById("modifier");
const editionModal = document.getElementById("edition-modal");
const overlay = document.getElementById("overlay");
const modalViewGallery = document.getElementById("modal-view-gallery");
const modalViewAddPhoto = document.getElementById("modal-view-add-photo");
const modalClose = document.querySelector(".modal-close");
const goBack = document.getElementById("goBack");
const modalGallery = document.getElementById("modal-gallery");
const addPhotoModalBtn = document.getElementById("add-photo-modal-btn");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const newWorkForm = document.getElementById("new-work-form");

// ACCES AU MODE EDITION
manageEditionMode();

// OUVRIR LA MODAL (DIRECTEMENT SUR "GALLERIE PHOTO")
function openEditionModal() {
  editionModal.classList.add("active");
  modalViewGallery.classList.add("active");
  majModalgallery();
}
modifierBtn.addEventListener("click", () => openEditionModal());

// OUVRIR LA MODAL "AJOUTER PHOTO"
function openAddPhotoModal() {
  modalViewGallery.classList.remove("active");
  modalViewAddPhoto.classList.add("active");
  createOptionsByCategories();
}
addPhotoModalBtn.addEventListener("click", () => openAddPhotoModal());

// PREVISUALISER L'UPLOAD DE L'INPUT
addPhotoBtn.addEventListener("change", previewPhoto);

// REVENIR A LA MODAL GALLERY
goBack.addEventListener("click", () => returnToGalleryModal());

// ENVOYER LE FORMULAIRE POUR UN NOUVEAU WORK
newWorkForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await createNewWork();
  await majModalgallery();
  returnToGalleryModal();
});

// FERMER LA MODAL EDITION
async function closeModal() {
  await majGallery();
  modalGallery.innerHTML = "";
  modalViewGallery.classList.remove("active");
  editionModal.classList.remove("active");
}

// POUVOIR FERMER LA MODAL EN CLIQUANT SUR LA CROIX
modalClose.addEventListener("click", () => closeModal());

// POUVOIR FERMER LA MODAL EN CLIQUANT A L'EXTERIEUR
overlay.addEventListener("click", () => {
  closeModal();
});
