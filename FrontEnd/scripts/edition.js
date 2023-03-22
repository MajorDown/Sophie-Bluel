// OUVRIR LA MODAL (DIRECTEMENT SUR "GALLERIE PHOTO")
export function openEditionModal() {
  const editionModal = document.getElementById("edition-modal");
  editionModal.classList.add("active");
  const modalViewGallery = document.getElementById("modal-view-gallery");
  modalViewGallery.classList.add("active");
}

// FERMER LA MODAL EDITION
export function closeEditionModal() {
  const editionModal = document.getElementById("edition-modal");
  editionModal.classList.remove("active");
  const modalViewGallery = document.getElementById("modal-view-gallery");
  modalViewGallery.classList.remove("active");
}

// OUVRIR LA MODAL "AJOUTER PHOTO"
export function openAddPhotoModal() {
  const modalViewGallery = document.getElementById("modal-view-gallery");
  modalViewGallery.classList.remove("active");
  const modalViewAddPhoto = document.getElementById("modal-view-add-photo");
  modalViewAddPhoto.classList.add("active");
}
