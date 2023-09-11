const NUMBER_TWELVE = 12;

async function nationalityFilterRequest(nationality) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const data = await result.json();
  const finalResult = data.meals;
  return finalResult.slice(0, NUMBER_TWELVE);
}

export default nationalityFilterRequest;
