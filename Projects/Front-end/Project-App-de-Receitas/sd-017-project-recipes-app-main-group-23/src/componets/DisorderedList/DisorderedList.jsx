import React from 'react';
import PropTypes from 'prop-types';

function DisorderedList({ recipe }) {
  return (
    <ul>
      { recipe.map((element, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ element }
        >
          { element }
        </li>
      )) }
    </ul>
  );
}

DisorderedList.propTypes = {
  recipe: PropTypes.arrayOf,
}.isRequired;

export default DisorderedList;
