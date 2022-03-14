import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import drinkRequest from '../../services/DrinkRequest';
import foodRequest from '../../services/FoodRequest';
import Loading from '../Loading/Loading';
import './style.css';

function RecommendedRecipes({ typeFood }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const NUMBER_SIX = 6;

  const getFoods = async () => {
    const response = await foodRequest(NUMBER_SIX);
    setRecipes(response);
    setLoading(false);
  };

  const getDrinks = async () => {
    const response = await drinkRequest(NUMBER_SIX);
    setRecipes(response);
    setLoading(false);
  };

  useEffect(() => {
    if (typeFood === 'food') getDrinks();
    else getFoods();
  }, [typeFood]);

  if (loading) return <Loading />;

  return (
    <section className="recommended-recipes">
      {recipes.map((recipe, index) => (
        <section
          key={
            typeFood === 'food'
              ? recipe.idDrink
              : recipe.idMeal
          }
          className="recomendation-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <h2 data-testid={ `${index}-recomendation-title` }>
            { typeFood === 'food'
              ? recipe.strDrink
              : recipe.strMeal }
          </h2>
        </section>
      ))}
    </section>
  );
}

RecommendedRecipes.propTypes = {
  typeFood: PropTypes.string,
}.isRequired;

export default RecommendedRecipes;
