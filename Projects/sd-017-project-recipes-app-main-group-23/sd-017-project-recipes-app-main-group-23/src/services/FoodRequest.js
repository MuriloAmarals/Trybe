async function foodRequest(qntRecipes) {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await data.json();
  const finalResult = result.meals.slice(0, qntRecipes);
  return (finalResult);
}

export default foodRequest;
