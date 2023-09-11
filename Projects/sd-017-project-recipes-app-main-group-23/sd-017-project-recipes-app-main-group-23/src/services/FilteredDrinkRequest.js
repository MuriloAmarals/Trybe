const NUMBER_TWELVE = 12;

async function filteredDrinkRequest(category) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await data.json();
  const finalResult = result.drinks
    .slice(0, NUMBER_TWELVE);
  return (finalResult);
}

export default filteredDrinkRequest;
