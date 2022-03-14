import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipesCard({ recipe, index, unFavorite }) {
  const [isCopied, setIsCopied] = useState(false);
  const history = useHistory();

  function handleShare() {
    const currentURL = window.location.href;
    const url = `${currentURL.replace('favorite-recipes', '')}`
    + `${recipe.type}s/${recipe.id}`;
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div>
      <input
        data-testid={ `${index}-horizontal-image` }
        type="image"
        src={ recipe.image }
        width="200px"
        alt={ `${recipe.name}` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      />

      <h1
        data-testid={ `${index}-horizontal-top-text` }
      >
        {
          recipe.alcoholicOrNot === ''
            ? `${recipe.nationality} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </h1>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </Link>
      <button
        type="button"
        name={ recipe.image }
        onClick={ () => handleShare() }
      >
        { isCopied ? 'Link copied!' : (
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            className="share-icon"
            src={ shareIcon }
            alt="shareIcon"
          />
        )}
      </button>

      <button
        type="button"
        onClick={ (event) => unFavorite(event) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          className="favorite-button"
          src={ blackHeart }
          alt="Desfavoritar"
          name={ recipe.name }
          style={ { width: '25px' } }
        />
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string.isRequired,
  }).isRequired,
  unFavorite: PropTypes.func.isRequired,
};
