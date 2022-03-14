import detailsRecipeRequest from '../services/DetailsRecipeRequest';

const getIngredientMeasure = (array, key) => {
  const filterIngredients = array
    .filter((element) => (element[0].includes(key)))
    .filter((item) => item[1]);
  let values = [];

  filterIngredients.forEach((item) => {
    values = [...values, item[1]];
  });

  return values;
};

const getIngredientsAndMeassures = (array) => {
  const ingredients = getIngredientMeasure(array, 'strIngredient');
  const meassures = getIngredientMeasure(array, 'strMeasure');
  let recipe = [];
  ingredients.forEach((ingredient, index) => {
    recipe = [...recipe, `${ingredient} - ${meassures[index]}`];
  });

  return recipe;
};

const createObjectRecipe = ({ type, id, thumb, title, alcoholicOrNot, data }) => {
  const recipe = type === 'meals'
    ? getIngredientsAndMeassures(Object.entries(data.meals[0]))
    : getIngredientsAndMeassures(Object.entries(data.drinks[0]));

  return {
    id: data[type][0][id],
    type: type === 'meals' ? 'food' : 'drink',
    thumb: data[type][0][thumb],
    title: data[type][0][title],
    category: data[type][0].strCategory,
    recipe,
    instructions: data[type][0].strInstructions,
    video: data[type][0].strYoutube,
    nationality: data[type][0].strArea || '',
    alcoholicOrNot: type === 'meals' ? '' : alcoholicOrNot,
  };
};

const createDetailList = (data, food) => {
  let alcoholicOrNot = '';

  if (food === 'drinks') {
    alcoholicOrNot = data.drinks[0].strCategory === 'Cocktail'
      ? 'Alcoholic'
      : 'non-alcoholic';
  }

  return food === 'foods'
    ? createObjectRecipe({
      type: 'meals',
      id: 'idMeal',
      thumb: 'strMealThumb',
      title: 'strMeal',
      data,
    })
    : createObjectRecipe({
      type: 'drinks',
      id: 'idDrink',
      thumb: 'strDrinkThumb',
      title: 'strDrink',
      data,
      alcoholicOrNot,
    });
};

const getDetailsRecipe = async (location) => {
  const idRecipe = location.split('/');
  const result = await detailsRecipeRequest(idRecipe[2], idRecipe[1]);
  return createDetailList(result, idRecipe[1]);
};

export default getDetailsRecipe;
