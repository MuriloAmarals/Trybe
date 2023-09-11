const NUMBER_TWELVE = 12;

async function filteredFoodRequest(category) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await data.json();
  const finalResult = result.meals
    .slice(0, NUMBER_TWELVE);
  return (finalResult);
}

export default filteredFoodRequest;
