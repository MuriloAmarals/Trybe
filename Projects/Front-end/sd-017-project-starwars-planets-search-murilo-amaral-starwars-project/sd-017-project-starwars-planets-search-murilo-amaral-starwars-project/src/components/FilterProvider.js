import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const setNameFilter = (value) => {
    setFilter({ ...filter, filterByName: { name: value } });
  };

  const setNumericFilter = (one, two, three) => {
    setFilter(
      { ...filter,
        filterByNumericValues: [
          ...filter.filterByNumericValues,
          { column: one, comparison: two, value: three },
        ] },
    );
  };

  return (
    <FilterContext.Provider
      value={ {
        filter,
        setFilter,
        setNameFilter,
        setNumericFilter,
        columns,
        setColumns,
      } }
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FilterProvider;
