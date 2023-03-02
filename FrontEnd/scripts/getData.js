export async function getWorks() {
  return await (await fetch("http://localhost:5678/api/works")).json();
}

export async function getCategories() {
  return await (await fetch("http://localhost:5678/api/categories")).json();
}
