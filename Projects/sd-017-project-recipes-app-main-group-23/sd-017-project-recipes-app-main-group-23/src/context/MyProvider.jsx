import React, { useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function MyProvider({ children }) {
  const [resultRecipes, setResultRecipes] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [btnFinishDisabled, setBtnFinishDisabled] = useState(true);
  const [ingredientFilter, setFilterByIngredient] = useState('');

  const state = { resultRecipes,
    setResultRecipes,
    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
    btnFinishDisabled,
    setBtnFinishDisabled,
    ingredientFilter,
    setFilterByIngredient,
  };

  return (
    <myContext.Provider value={ state }>
      {children}
    </myContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
