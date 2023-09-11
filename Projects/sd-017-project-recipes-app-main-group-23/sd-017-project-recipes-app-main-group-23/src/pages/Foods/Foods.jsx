import React, { useEffect, useContext, useState } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';
import foodCategoryRequest from '../../services/FoodCategoryRequest';
import filteredFoodRequest from '../../services/FilteredFoodRequest';
import ingredientRequest from '../../services/IngredientRequest';

const NUMBER_TWELVE = 12;

function Foods() {
  const { resultRecipes,
    setResultRecipes,
    foodCategories,
    setFoodCategories, ingredientFilter } = useContext(myContext);
  const [activeCategory, selectCategory] = useState('');

  useEffect(() => {
    const getFoods = async (category) => {
      setResultRecipes(await foodRequest(NUMBER_TWELVE));
      if (activeCategory !== '') {
        setResultRecipes(await filteredFoodRequest(category));
      } if (ingredientFilter !== '') {
        setResultRecipes(await ingredientRequest(ingredientFilter, 'foods'));
      }
    };

    const getFoodCategories = async () => {
      setFoodCategories(await foodCategoryRequest());
    };

    getFoods(activeCategory);
    getFoodCategories();
  }, [setFoodCategories, setResultRecipes, activeCategory, ingredientFilter]);

  return (
    <main>
      <section>
        {foodCategories.map((element) => (
          <label
            key={ element.strCategory }
            htmlFor={ element.strCategory }
          >
            {element.strCategory}
            <input
              type="checkbox"
              id={ element.strCategory }
              data-testid={ `${element.strCategory}-category-filter` }
              value={ element.strCategory }
              name="category"
              onChange={ ({ target }) => {
                if (target.checked) {
                  selectCategory(target.value);
                } else {
                  selectCategory('');
                }
              } }
            />
          </label>
        ))}
        <label
          htmlFor="all"
        >
          All
          <input
            type="checkbox"
            name="category"
            id="all"
            data-testid="All-category-filter"
            onChange={ ({ target }) => {
              if (target.checked) {
                selectCategory('');
              }
            } }
          />
        </label>
      </section>
      <section>
        {resultRecipes
          .map((e, index) => (
            <CardRecipe
              key={ `${e.idMeal}${index}` }
              index={ index }
              type="foods"
              id={ e.idMeal }
              image={ e.strMealThumb }
              name={ e.strMeal }
            />
          )) }
      </section>
    </main>
  );
}

export default Foods;
