function verifyNull(typeFood, result) {
  if (typeFood === 'foods') return !result.meals;
  return !result.drinks;
}

async function nameRequest(name, typeFood) {
  const url = typeFood === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetch(url);
  const result = await data.json();
  const isNull = verifyNull(typeFood, result);
  if (isNull) return null;
  return typeFood === 'foods' ? result.meals : result.drinks;
}

export default nameRequest;
