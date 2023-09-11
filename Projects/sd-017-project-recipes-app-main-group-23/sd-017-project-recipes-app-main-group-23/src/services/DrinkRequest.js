async function drinkRequest(qntRecipes) {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await data.json();
  const finalResult = result.drinks.slice(0, qntRecipes);
  return (finalResult);
}

export default drinkRequest;
