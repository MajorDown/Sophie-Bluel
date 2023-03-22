// AUTHENTIFIER L'UTILISATEUR
function isConnected() {
  if (sessionStorage.getItem("token")) return true;
  else return false;
}

// ACCEDER AU MODE EDITION
export function manageEditionMode() {
  // ELEMENTS DU DOM
  const editionHeader = document.getElementById("edition-header");
  const loginToLogout = document.getElementById("loginToLogout");
  const modifierIntro = document.getElementById("modifier-intro");
  const modifierBtn = document.getElementById("modifier");
  const filterByCategory = document.getElementById("filter-by-category");
  // CONDITIONNEMENT
  if (isConnected() === true) {
    loginToLogout.innerText = "logout";
    loginToLogout.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.replace("index.html");
    });
    editionHeader.classList.add("active");
    modifierBtn.classList.add("active");
    modifierIntro.classList.add("active");
    filterByCategory.classList.add("active");
  } else {
    loginToLogout.innerText = "login";
    loginToLogout.addEventListener("click", () =>
      window.location.replace("login.html")
    );
    editionHeader.classList.remove("active");
    modifierBtn.classList.remove("active");
    modifierIntro.classList.remove("active");
    filterByCategory.classList.remove("active");
  }
}
