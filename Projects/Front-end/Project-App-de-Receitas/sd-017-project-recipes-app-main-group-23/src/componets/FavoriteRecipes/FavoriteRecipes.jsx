import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipesCard from '../FavoriteRecipesCard/FavoriteRecipesCard';

function FavoriteRecipes({ handleClick, filteredFavoriteRecipes, unFavorite }) {
  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          name="all"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          name="food"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="drink"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          Drinks
        </button>
      </div>
      {
        filteredFavoriteRecipes.map((recipe, index) => (
          <FavoriteRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            unFavorite={ unFavorite }
          />
        ))
      }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  filteredFavoriteRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
  unFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipes;
