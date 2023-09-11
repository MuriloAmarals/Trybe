import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import foodDrinkIngredientsRequest from '../../services/FoodDrinkIngredientsRequest';
import myContext from '../../context/myContext';

function ExploreIngredients() {
  const [ingredientList, setIngredientList] = useState([]);
  const location = useLocation();
  const { setFilterByIngredient } = useContext(myContext);

  useEffect(() => {
    const getIngredients = async () => (
      location.pathname.includes('foods')
        ? setIngredientList(await foodDrinkIngredientsRequest('foods'))
        : setIngredientList(await foodDrinkIngredientsRequest('drinks'))
    );
    getIngredients();
  }, [location]);

  return (
    <main>
      {location.pathname.includes('foods')
        ? (ingredientList.map((elem, index) => (
          <Link
            key={ index }
            to="/foods"
            onClick={ () => {
              setFilterByIngredient(elem.strIngredient);
            } }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <h1 data-testid={ `${index}-card-name` }>{elem.strIngredient}</h1>
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredient-name"
                src={ `https://www.themealdb.com/images/ingredients/${elem.strIngredient}-Small.png` }
              />
            </div>
          </Link>
        )))
        : (
          ingredientList.map((elem, index) => (
            <Link
              key={ index }
              to="/drinks"
              onClick={ () => {
                setFilterByIngredient(elem.strIngredient1);
              } }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <h1 data-testid={ `${index}-card-name` }>{elem.strIngredient1}</h1>
                <img
                  data-testid={ `${index}-card-img` }
                  alt="ingredient-name"
                  src={ `https://www.thecocktaildb.com/images/ingredients/${elem.strIngredient1}-Small.png` }
                />
              </div>
            </Link>
          ))
        )}
    </main>
  );
}

export default ExploreIngredients;
