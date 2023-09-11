import React, { useEffect, useState, useContext } from 'react';
import nationalitiesRequest from '../../services/NationalitiesRequest';
import nationalityFilterRequest from '../../services/NationalityFilterRequest';
import foodRequest from '../../services/FoodRequest';
import myContext from '../../context/myContext';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';

const NUMBER_TWELVE = 12;

function ExploreNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [activeNationality, setActiveNationality] = useState('');
  const { resultRecipes, setResultRecipes } = useContext(myContext);

  useEffect(() => {
    const getData = async () => {
      if (activeNationality !== '' && activeNationality !== 'All') {
        setResultRecipes(await nationalityFilterRequest(activeNationality));
      }
      if (activeNationality === 'All') {
        setResultRecipes(await foodRequest(NUMBER_TWELVE));
      }
      if (activeNationality === '') {
        setResultRecipes(await foodRequest(NUMBER_TWELVE));
      }
    };
    getData();
    const getRecipes = async () => {
      setNationalities(await nationalitiesRequest());
    };
    getRecipes();
  }, [activeNationality, setResultRecipes]);
  return (
    <main>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => {
          setActiveNationality(target.value);
        } }
      >
        <option
          value="All"
          name="nationalities"
          data-testid="All-option"
        >
          All
        </option>
        {nationalities.map((elem, index) => (
          <option
            data-testid={ `${elem.strArea}-option` }
            key={ index }
            name="nationalities"
            value={ elem.strArea }
          >
            {elem.strArea}
          </option>
        ))}
      </select>
      {resultRecipes.map((elem, index) => (
        <CardRecipe
          key={ index }
          index={ index }
          image={ elem.strMealThumb }
          name={ elem.strMeal }
          id={ elem.idMeal }
          type="foods"
        />
      ))}
    </main>
  );
}

export default ExploreNationalities;
