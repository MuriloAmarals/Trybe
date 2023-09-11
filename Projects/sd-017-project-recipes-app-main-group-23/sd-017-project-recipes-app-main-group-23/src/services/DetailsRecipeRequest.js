async function detailsRecipeRequest(id, typeFood) {
  const url = typeFood === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(url);
  const result = await data.json();
  return result;
}

export default detailsRecipeRequest;
