async function firstLetterRequest(firstLetter, typeFood) {
  const url = typeFood === 'foods'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const data = await fetch(url);
  const result = await data.json();
  return typeFood === 'foods' ? result.meals : result.drinks;
}

export default firstLetterRequest;
