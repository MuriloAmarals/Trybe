async function recipeRandomRequest(typeFood) {
  const url = typeFood === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetch(url);
  const result = await data.json();
  return typeFood === 'foods' ? result.meals : result.drinks;
}

export default recipeRandomRequest;
