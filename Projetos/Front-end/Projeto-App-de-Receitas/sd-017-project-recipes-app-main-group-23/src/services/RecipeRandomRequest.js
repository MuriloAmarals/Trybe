async function recipeRandomRequest(typeFood) {
  const url = typeFood === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  try {
    const data = await fetch(url);
    const result = await data.json();
    return typeFood === 'foods' ? result.meals : result.drinks;
  } catch (err) {
    return err;
  }
}

export default recipeRandomRequest;
