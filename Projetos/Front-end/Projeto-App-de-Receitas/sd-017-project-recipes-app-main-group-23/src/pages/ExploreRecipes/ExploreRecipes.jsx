import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import recipeRandomRequest from '../../services/RecipeRandomRequest';

function ExploreRecipes() {
  const [pathname, setPathName] = useState('');
  const history = useHistory();
  const location = useLocation();

  const redirectRandomRecipe = async () => {
    const response = (await recipeRandomRequest(pathname));
    return pathname === 'foods'
      ? history.push(`/${pathname}/${response[0].idMeal}`)
      : history.push(`/${pathname}/${response[0].idDrink}`);
  };

  useEffect(() => {
    setPathName(location.pathname.split('/')[2]);
  }, [location.pathname]);

  return (
    <main className="explore-recipes-container">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`/explore/${pathname}/ingredients`) }
      >
        By Ingredient
      </button>

      { pathname === 'foods' && (
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push(`/explore/${pathname}/nationalities`) }
        >
          By Nationality
        </button>
      ) }

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ redirectRandomRecipe }
      >
        Surprise me!
      </button>
    </main>
  );
}

export default ExploreRecipes;
