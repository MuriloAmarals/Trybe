async function detailsRecipeRequest(id, typeFood) {
  const url = typeFood === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const data = await fetch(url);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default detailsRecipeRequest;
