const NUMBER_FIVE = 5;

async function drinkCategoryRequest() {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const result = await data.json();
    const finalResult = result.drinks.slice(0, NUMBER_FIVE);
    return (finalResult);
  } catch (err) {
    return err;
  }
}

export default drinkCategoryRequest;
