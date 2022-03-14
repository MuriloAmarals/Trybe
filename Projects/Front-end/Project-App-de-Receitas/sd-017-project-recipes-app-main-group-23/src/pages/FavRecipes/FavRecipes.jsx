import React, { useEffect, useState } from 'react';
import FavoriteRecipes from '../../componets/FavoriteRecipes/FavoriteRecipes';

function FavoritesRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  const handleClick = (event) => {
    const { name } = event.target;
    if (name === 'all') {
      setFilteredFavoriteRecipes(favoriteRecipes);
    } else {
      const getFavoriteRecipes = favoriteRecipes.filter((recipe) => (
        recipe.type.includes(name)
      ));
      setFilteredFavoriteRecipes(getFavoriteRecipes);
    }
  };

  const unFavorite = (event) => {
    const { name } = event.target;
    const filteredRecipes = favoriteRecipes.filter((recipe) => (
      recipe.name !== name
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
    const favoriteRecipesLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    setFavoriteRecipes(favoriteRecipesLocalStorage);
    setFilteredFavoriteRecipes(favoriteRecipesLocalStorage);
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const favoriteRecipesLocalStorage = JSON.parse(localStorage
        .getItem('favoriteRecipes'));
      setFavoriteRecipes(favoriteRecipesLocalStorage);
      setFilteredFavoriteRecipes(favoriteRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <FavoriteRecipes
        handleClick={ handleClick }
        filteredFavoriteRecipes={ filteredFavoriteRecipes }
        unFavorite={ unFavorite }
      />
    </div>
  );
}

export default FavoritesRecipes;
