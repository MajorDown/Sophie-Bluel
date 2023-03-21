// IMPORTS
import { postNewWork } from "./fetchData.js";

// ELEMENTS DU DOM
const modalViewGallery = document.getElementById("modal-view-gallery");
const modalViewAddPhoto = document.getElementById("modal-view-add-photo");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const addPhotoIcon = document.getElementById("addPhotoIcon");
const addPhotoInstructions = document.getElementById("addPhotoInstructions");
const projectTitle = document.getElementById("project-title");
const projectCategory = document.getElementById("project-category");

// ANNULER L'UPLOAD DE PHOTO EVENTUELLEMENT FAIT
export function cancelUploadedPhoto() {
  if (document.querySelector(".uploaded-photo")) {
    document.querySelector(".uploaded-photo").remove();
    addPhotoIcon.style.display = "inline";
    addPhotoBtn.style.display = "inline";
    addPhotoInstructions.style.display = "block";
  }
}

// REVENIR A LA MODAL GALLERY
export function returnToGalleryModal() {
  cancelUploadedPhoto();
  projectTitle.value = "";
  modalViewAddPhoto.classList.remove("active");
  modalViewGallery.classList.add("active");
}

// PREVISUALISER LA PHOTO UPLOADEE
export function previewPhoto() {
  const photo = addPhotoBtn.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.classList.add("uploaded-photo");
    addPhoto.appendChild(img);
  };
  reader.readAsDataURL(photo);
  addPhotoIcon.style.display = "none";
  addPhotoBtn.style.display = "none";
  addPhotoInstructions.style.display = "none";
}

// IMPLEMENTER LES CATEGORY DANS LE FORMULAIRE
export async function createOptionsByCategories(cat) {
  try {
    projectCategory.innerHTML = "";
    const nullOption = document.createElement("option");
    nullOption.value = "";
    projectCategory.appendChild(nullOption);
    cat.map((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.innerText = category.name;
      projectCategory.appendChild(option);
    });
  } catch (err) {
    window.alert(
      "Problême de connection : impossible de récupérer les catégories."
    );
    console.log(err);
  }
}

// ENVOYER LE FORMULAIRE POUR UN NOUVEAU WORK
export async function createNewWork() {
  // DECLARER UN NOUVEAU FORMDATA A PARTIR DU FORMULAIRE
  const formData = new FormData();
  formData.append("title", projectTitle.value);
  formData.append("image", addPhotoBtn.files[0]);
  if (projectCategory.value != "") {
    formData.append("category", projectCategory.value);
  }
  //ENVOI DE LA REQUETE
  try {
    const postedWork = await postNewWork(formData);
    console.log("Requète POST envoyé. Réponse du serveur : ", postedWork);
    addPhotoBtn.value = "";
    projectTitle.value = "";
    projectCategory.value = "";
  } catch (err) {
    window.alert(
      "Problême de connection : impossible de poster un nouveau projet."
    );
    console.log(err);
  }
}
