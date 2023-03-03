import { getWorks, getCategories } from "./getData.js";
const works = await getWorks();
const categories = await getCategories();

// ELEMENTS DU DOM
const editionHeader = document.getElementById("edition-header");
const loginToLogout = document.getElementById("loginToLogout");
const modifierBtn = document.getElementById("modifier");
const modifierIntro = document.getElementById("modifier-intro");
const filterByCategory = document.getElementById("filter-by-category");
const editionModal = document.getElementById("edition-modal");
const modalViewGallery = document.getElementById("modal-view-gallery");
const modalViewAddPhoto = document.getElementById("modal-view-add-photo");
const modalClose = document.querySelector(".modal-close");
const goBack = document.getElementById("goBack");
const modalGallery = document.getElementById("modal-gallery");
const addPhotoModalBtn = document.getElementById("add-photo-modal-btn");
const addPhoto = document.getElementById("addPhoto");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const ProjectCategory = document.getElementById("project-category");

// AUTHENTIFIER L'UTILISATEUR
export function isConnected() {
  if (sessionStorage.getItem("token")) return true;
  else return false;
}

// ACCEDER AU MODE UTILISATEUR
function getEditionMode() {
  if (isConnected() === true) {
    editionHeader.classList.add("active");
    modifierBtn.classList.add("active");
    modifierIntro.classList.add("active");
    filterByCategory.classList.add("active");
    loginToLogout.innerText = "logout";
    return true;
  } else return false;
}
getEditionMode();

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

// OUVRIR LA MODAL "GALLERIE PHOTO"
function openEditionModal() {
  editionModal.classList.add("active");
  // IMPLEMENTER LA MODAL AVEC LES TRAVAUX
  works.map((work) => {
    modalGallery.appendChild(createCard(work));
  });
}
modifierBtn.addEventListener("click", () => openEditionModal());

// FERMER LA MODAL EDITION
function closeModal() {
  editionModal.classList.remove("active");
}
modalClose.addEventListener("click", () => closeModal());

// OUVRIR LA MODAL "AJOUTER PHOTO"
function openAddPhotoModal() {
  modalViewGallery.classList.remove("active");
  modalViewAddPhoto.classList.add("active");
}
addPhotoModalBtn.addEventListener("click", () => openAddPhotoModal());

// REVENIR A LA MODAL GALLERY
function returnToGalleryModal() {
  console.log(addPhotoBtn.value);
  // ANNULER L'UPLOAD DE PHOTO EVENTUELLEMENT DEJA FAIT
  addPhotoBtn.value = "";
  document.querySelector(".uploaded-photo").remove();
  addPhotoBtn.style.display = "inline";
  modalViewAddPhoto.classList.remove("active");
  modalViewGallery.classList.add("active");
}
goBack.addEventListener("click", () => returnToGalleryModal());

// PREVISUALISER L'UPLOAD DE L'INPUT "addPhotoBtn"
function previewPhoto() {
  console.log("fichier uploadé !");
  const photo = addPhotoBtn.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.classList.add("uploaded-photo");
    addPhoto.appendChild(img);
  };
  reader.readAsDataURL(photo);
  addPhotoBtn.style.display = "none";
}
addPhotoBtn.addEventListener("change", previewPhoto);

// CREER UNE OPTION PAR CATEGORY DANS SELECT
function createCategoryOption(category) {
  const option = document.createElement("option");
  option.value = category.name;
  option.innerText = category.name;
  return option;
}
categories.map((category) => {
  ProjectCategory.appendChild(createCategoryOption(category));
});
