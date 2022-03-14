import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../../componets/Loading/Loading';
import './style.css';
import RecommendedRecipes from '../../componets/RecommendedRecipes/RecommendedRecipes';
import DetailsRecipe from '../../componets/DetailsRecipe/DetailsRecipe';
import getDetailsRecipe from '../../helpers/getDetailsRecipe';

function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const history = useHistory();
  const [statusRecipe, setStatusRecipe] = useState();

  const redirectRecipeInProgress = () => {
    history.push(`/${detailsRecipe.type}s/${detailsRecipe.id}/in-progress`);
  };

  const getLocalStorage = () => {
    const storage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };

    return storage;
  };

  useEffect(() => {
    const fetchDetailRecipe = async () => {
      setDetailsRecipe(await getDetailsRecipe(location.pathname));
      setLoading(false);
    };

    const getFavoritesLocalStorage = () => {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setIsFavorite(favoriteArray.some((favorites) => favorites.id === detailsRecipe.id));
    };

    const getRecipesInLocalStorage = () => {
      const storage = getLocalStorage();
      const pathname = location.pathname.split('/');
      const typeFood = pathname[1] === 'foods' ? 'meals' : 'cocktails';
      if (Object.keys(storage[typeFood])
        .includes(pathname[2])) setStatusRecipe('Continue Recipe');
      else setStatusRecipe('Start Recipe');
    };

    fetchDetailRecipe();
    getFavoritesLocalStorage();
    getRecipesInLocalStorage();
  }, [setDetailsRecipe, location.pathname, detailsRecipe.id]);

  if (loading) return <Loading />;

  return (
    <main>
      <DetailsRecipe
        detailsRecipe={ detailsRecipe }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
        checkbox={ false }
      />

      { detailsRecipe.video !== undefined && (
        <iframe
          data-testid="video"
          width="100%"
          height="315"
          src={ detailsRecipe.video.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <RecommendedRecipes typeFood={ detailsRecipe.type } />

      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button-start-recipe"
        onClick={ redirectRecipeInProgress }
      >
        { statusRecipe }
      </button>
    </main>
  );
}

export default RecipeDetails;
