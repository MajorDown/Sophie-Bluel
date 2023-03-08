// RECUPERER LES WORKS
export async function getWorks() {
  return await (await fetch("http://localhost:5678/api/works")).json();
}
// RECUPERER LES CATEGORIES
export async function getCategories() {
  return await (await fetch("http://localhost:5678/api/categories")).json();
}

// SUPPRIMER UN WORK
export async function deleteWork(id) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  return await (
    await fetch(`http://localhost:5678/api/works/${id}`, options)
  ).json();
}

// ENVOYER UN NOUVEAU WORK
export async function postNewWork(data) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  return await (await fetch("http://localhost:5678/api/works", options)).json();
}
