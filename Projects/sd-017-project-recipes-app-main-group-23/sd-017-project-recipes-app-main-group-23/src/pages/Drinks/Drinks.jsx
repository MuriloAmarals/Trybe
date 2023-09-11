import React, { useContext, useEffect, useState } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import drinkRequest from '../../services/DrinkRequest';
import drinkCategoryRequest from '../../services/DrinkCategoryRequest';
import filteredDrinkRequest from '../../services/FilteredDrinkRequest';
import ingredientRequest from '../../services/IngredientRequest';

const NUMBER_TWELVE = 12;

function Drinks() {
  const { resultRecipes, setResultRecipes,
    drinkCategories, setDrinkCategories, ingredientFilter } = useContext(myContext);
  const [activeCategory, selectCategory] = useState('');

  useEffect(() => {
    const getDrinks = async (category) => {
      setResultRecipes(await drinkRequest(NUMBER_TWELVE));
      if (activeCategory !== '') {
        setResultRecipes(await filteredDrinkRequest(category));
      } if (ingredientFilter !== '') {
        setResultRecipes(await ingredientRequest(ingredientFilter, 'drinks'));
      }
    };

    const getDrinksCategories = async () => {
      setDrinkCategories(await drinkCategoryRequest());
    };
    getDrinks(activeCategory);
    getDrinksCategories();
  }, [setDrinkCategories, setResultRecipes, activeCategory, ingredientFilter]);

  return (
    <main>
      <section>
        {drinkCategories.map((element) => (
          <label
            key={ element.strCategory }
            htmlFor={ element.strCategory }
          >
            {element.strCategory}
            <input
              type="checkbox"
              name="category"
              id={ element.strCategory }
              value={ element.strCategory }
              data-testid={ `${element.strCategory}-category-filter` }
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
        { resultRecipes.map((element, index) => (
          <CardRecipe
            key={ `${element.idDrink}${index}` }
            id={ element.idDrink }
            type="drinks"
            index={ index }
            image={ element.strDrinkThumb }
            name={ element.strDrink }
          />
        ))}
      </section>
    </main>
  );
}

export default Drinks;
