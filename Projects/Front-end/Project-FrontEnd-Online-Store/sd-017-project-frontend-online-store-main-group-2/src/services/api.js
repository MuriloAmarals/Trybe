export async function getCategories() {
  // Implemente aqui
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories').catch((error) => console.error(error));
  return categories.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const categoriesAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return categoriesAndQuery.json();
}

export default getCategories;
