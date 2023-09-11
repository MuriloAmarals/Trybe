const fetchPlanets = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    data.results.forEach((planet) => (delete planet.residents));
    return data;
  } catch (error) {
    return error.message;
  }
};

export default fetchPlanets;
