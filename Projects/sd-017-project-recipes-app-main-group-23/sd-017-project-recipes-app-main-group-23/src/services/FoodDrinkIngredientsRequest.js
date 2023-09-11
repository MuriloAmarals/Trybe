const NUMBER_TWELVE = 12;

async function foodDrinkIngredientsRequest(type) {
  const url = type === 'foods'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(url);
    const result = await response.json();
    const slicedresult = type === 'foods'
      ? result.meals.slice(0, NUMBER_TWELVE)
      : result.drinks.slice(0, NUMBER_TWELVE);
    return (slicedresult);
  } catch (err) {
    return err;
  }
}

export default foodDrinkIngredientsRequest;
