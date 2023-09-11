const nationalitiesRequest = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await result.json();
  return data.meals;
};

export default nationalitiesRequest;
