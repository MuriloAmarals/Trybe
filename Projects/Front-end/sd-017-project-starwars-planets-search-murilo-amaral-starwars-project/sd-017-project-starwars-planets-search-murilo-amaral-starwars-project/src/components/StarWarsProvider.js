import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/starWarsAPI';

export const StarWarsContext = createContext();

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [all, setAll] = useState([]);

  async function fetchStarWars() {
    const response = await fetchPlanets();
    setPlanets(response.results);
    setAll(response.results);
  }

  useEffect(() => {
    fetchStarWars();
  }, []);

  return (
    <StarWarsContext.Provider value={ { planets, setPlanets, all, setAll } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default StarWarsProvider;
