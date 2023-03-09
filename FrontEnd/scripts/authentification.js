// ELEMENTS DU DOM
const editionHeader = document.getElementById("edition-header");
const loginToLogout = document.getElementById("loginToLogout");
const modifierIntro = document.getElementById("modifier-intro");
const modifierBtn = document.getElementById("modifier");
const filterByCategory = document.getElementById("filter-by-category");

// AUTHENTIFIER L'UTILISATEUR
function isConnected() {
  if (sessionStorage.getItem("token")) return true;
  else return false;
}

// ACCEDER AU MODE EDITION
export function getEditionMode() {
  if (isConnected() === true) {
    editionHeader.classList.add("active");
    modifierBtn.classList.add("active");
    modifierIntro.classList.add("active");
    filterByCategory.classList.add("active");
    loginToLogout.innerText = "logout";
    return true;
  } else {
    editionHeader.classList.remove("active");
    modifierBtn.classList.remove("active");
    modifierIntro.classList.remove("active");
    filterByCategory.classList.remove("active");
    loginToLogout.innerText = "login";
    return false;
  }
}

// SORTIR DU MODE EDITION (POUR ADDEVENTLISTENER)
export function removeEditionMode(event) {
  if (isConnected === true) {
    event.preventDefault();
    sessionStorage.removeItem("token");
    getEditionMode();
    window.location.href = "index.html";
  }
}
