import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DetailsRecipe from '../../componets/DetailsRecipe/DetailsRecipe';
import Loading from '../../componets/Loading/Loading';
import getDetailsRecipe from '../../helpers/getDetailsRecipe';
import myContext from '../../context/myContext';

function RecipeInProgress() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { btnFinishDisabled } = useContext(myContext);
  const history = useHistory();

  const setDoneRecipes = (item) => {
    const { id, type, thumb, title, category,
      recipe,
      instructions,
      video, nationality, alcoholicOrNot } = item;
    const obj = {
      id,
      type,
      image: thumb,
      name: title,
      category,
      recipe,
      instructions,
      video,
      nationality,
      alcoholicOrNot,
      doneDate: '',
      tags: [],
    };
    const currentStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (currentStorage) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...currentStorage, obj]));
    } else {
      localStorage.setItem('doneRecipes',
        JSON.stringify([obj]));
    }
  };

  useEffect(() => {
    const fetchDetailRecipe = async () => {
      setDetailsRecipe(await getDetailsRecipe(location.pathname));
      setLoading(false);
    };

    const getLocalStorage = () => {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setIsFavorite(favoriteArray.some((favorites) => favorites.id === detailsRecipe.id));
    };

    fetchDetailRecipe();
    getLocalStorage();
  }, [setDetailsRecipe, location.pathname, detailsRecipe.id]);

  if (loading) return <Loading />;

  return (
    <main>
      <DetailsRecipe
        detailsRecipe={ detailsRecipe }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
        checkbox
      />

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnFinishDisabled }
        onClick={ () => {
          history.push('/done-recipes');
          setDoneRecipes(detailsRecipe);
        } }
      >
        Finish Recipe
      </button>
    </main>
  );
}

export default RecipeInProgress;
