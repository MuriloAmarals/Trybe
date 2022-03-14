import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import searchFood from '../../helpers/searchFood';
import myContext from '../../context/myContext';

const NUMBER_TWELVE = 12;

function Header({ title, searchBtn }) {
  const [showInput, setShowInput] = useState(false);
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('name');
  const history = useHistory();
  const { setResultRecipes } = useContext(myContext);
  const pathTitle = title.toLowerCase();

  function redirectResults(results) {
    if (results.length === 1) {
      return pathTitle === 'foods'
        ? history.push(`/${pathTitle}/${results[0].idMeal}`)
        : history.push(`/${pathTitle}/${results[0].idDrink}`);
    }
    const newArray = results.slice(0, NUMBER_TWELVE);
    setResultRecipes(newArray);
    return pathTitle === 'foods' ? history.push(`/${pathTitle}`)
      : history.push(`/${pathTitle}`);
  }

  async function handleClickSearchFood() {
    if (radioValue === 'first letter' && valueInputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const results = await searchFood(radioValue, valueInputSearch, pathTitle);
      if (results === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else redirectResults(results);
    }
  }

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <header className="header-container">
      <button type="button" onClick={ handleClickProfile }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <h1 data-testid="page-title" className="title-header">{ title }</h1>
      { searchBtn && (
        <button type="button" onClick={ toggleInput }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search Button" />
        </button>
      ) }
      { showInput && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            value={ valueInputSearch }
            onChange={ ({ target }) => setValueInputSearch(target.value) }
          />

          <label htmlFor="ingredient">
            <input
              name="radio-buttons"
              id="ingredient"
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              name="radio-buttons"
              id="name"
              type="radio"
              data-testid="name-search-radio"
              value="name"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              name="radio-buttons"
              id="first-letter"
              type="radio"
              data-testid="first-letter-search-radio"
              value="first letter"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            First letter
          </label>

          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClickSearchFood }
          >
            Search
          </button>
        </div>

      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
