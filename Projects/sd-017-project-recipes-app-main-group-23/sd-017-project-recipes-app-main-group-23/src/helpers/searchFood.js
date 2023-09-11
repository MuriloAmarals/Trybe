import firstLetterRequest from '../services/FirstLetterRequest';
import ingredientRequest from '../services/IngredientRequest';
import nameRequest from '../services/NameRequest';

const searchFood = async (option, name, typeFood) => {
  const options = {
    ingredient: ingredientRequest,
    name: nameRequest,
    'first letter': firstLetterRequest,
  };
  const result = await options[option](name, typeFood);
  return result;
};

export default searchFood;
