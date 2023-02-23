import { getFiltersByCategory } from "./scripts/utils";

try {
  // FONCTIONS A APPLIQUER
  await getFiltersByCategory();
  ////////////////////////
} catch (e) {
  console.log(e);
}
