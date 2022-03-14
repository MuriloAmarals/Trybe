async function foodRequest(qntRecipes) {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    const finalResult = result.meals.slice(0, qntRecipes);
    return (finalResult);
  } catch (err) {
    return err;
  }
}

export default foodRequest;
