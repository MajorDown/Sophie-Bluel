import {
  getWorks,
  getCategories,
  postNewWork,
  deleteWork,
} from "./fetchData.js";
const works = await getWorks();
const categories = await getCategories();

// ELEMENTS DU DOM
const editionHeader = document.getElementById("edition-header");
const loginToLogout = document.getElementById("loginToLogout");
const modifierBtn = document.getElementById("modifier");
const modifierIntro = document.getElementById("modifier-intro");
const filterByCategory = document.getElementById("filter-by-category");
const editionModal = document.getElementById("edition-modal");
const overlay = document.getElementById("overlay");
const modalViewGallery = document.getElementById("modal-view-gallery");
const modalViewAddPhoto = document.getElementById("modal-view-add-photo");
const modalClose = document.querySelector(".modal-close");
const goBack = document.getElementById("goBack");
const modalGallery = document.getElementById("modal-gallery");
const addPhotoModalBtn = document.getElementById("add-photo-modal-btn");
const addPhoto = document.getElementById("addPhoto");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const projectTitle = document.getElementById("project-title");
const projectCategory = document.getElementById("project-category");
const newWorkForm = document.getElementById("new-work-form");

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

// SORTIR DU MODE UTILISATEUR
loginToLogout.addEventListener("click", (e) => {
  if (loginToLogout.innerText === "logout") {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  }
});

// CREER UNE CARD PAR TRAVAIL
function createCard(work) {
  const card = document.createElement("div");
  card.classList.add("card");
  const bin = document.createElement("img");
  bin.classList.add("bin");
  bin.src = "./assets/icons/binIcon.png";
  bin.alt = "supprimer";
  bin.addEventListener("click", () => suppressWork(work.id));
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
  modalGallery.innerHTML = "";
  editionModal.classList.remove("active");
}

// POUVOIR FERMER LA MODAL EN CLIQUANT SUR LA CROIX
modalClose.addEventListener("click", () => closeModal());

// POUVOIR FERMER LA MODAL EN CLIQUANT A L'EXTERIEUR
overlay.addEventListener("click", () => closeModal());

// OUVRIR LA MODAL "AJOUTER PHOTO"
function openAddPhotoModal() {
  modalViewGallery.classList.remove("active");
  modalViewAddPhoto.classList.add("active");
}
addPhotoModalBtn.addEventListener("click", () => openAddPhotoModal());

// REVENIR A LA MODAL GALLERY
function returnToGalleryModal() {
  // ANNULER L'UPLOAD DE PHOTO EVENTUELLEMENT DEJA FAIT
  if (addPhoto.value) {
    addPhotoBtn.value = "";
  }
  if (document.querySelector(".uploaded-photo")) {
    document.querySelector(".uploaded-photo").remove();
    addPhotoBtn.style.display = "inline";
  }
  modalViewAddPhoto.classList.remove("active");
  modalViewGallery.classList.add("active");
}
goBack.addEventListener("click", () => returnToGalleryModal());

// PREVISUALISER L'UPLOAD DE L'INPUT "addPhotoBtn"
function previewPhoto() {
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
function createOptionForCategory(category) {
  const option = document.createElement("option");
  option.value = category.id;
  option.innerText = category.name;
  return option;
}
categories.map((category) => {
  projectCategory.appendChild(createOptionForCategory(category));
});

// SUPPRIMER UN WORK
async function suppressWork(id) {
  const confirmation = window.confirm(
    "Voulez-vous vraiment supprimer ce projet de la gallerie ?"
  );
  if (confirmation) {
    const suppression = await deleteWork(id);
  }
}

// ENVOYER LE FORMULAIRE POUR UN NOUVEAU WORK
newWorkForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", addPhotoBtn.files[0]);
  formData.append("title", projectTitle.value);
  formData.append("category", projectCategory.value);
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const posted = await postNewWork(formData);
  console.log(posted);
  editionModal.classList.remove("active");
  addPhotoBtn.value = "";
  projectTitle.value = "";
  projectCategory.value = "";
});
