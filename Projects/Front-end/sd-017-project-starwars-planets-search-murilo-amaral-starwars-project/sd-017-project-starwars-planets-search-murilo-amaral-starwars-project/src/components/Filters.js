import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from './FilterProvider';
import { StarWarsContext } from './StarWarsProvider';

export default function Filters() {
  const { planets, setPlanets, all } = useContext(StarWarsContext);
  const {
    filter,
    setFilter,
    setNameFilter,
    setNumericFilter,
    columns,
    setColumns,
  } = useContext(FilterContext);
  const [column, setColumn] = useState(columns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [sortCol, setSortCol] = useState('population');
  const [sortOr, setSortOr] = useState('ASC');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'name-filter') {
      setNameFilter(value);
    } else if (name === 'column-filter') {
      setColumn(value);
    } else if (name === 'comparison-filter') {
      setComparison(value);
    } else if (name === 'value-filter') {
      setFilterValue(value);
    }
  };
  const filtering = (col, comp, val) => {
    const newPlanets = planets.filter((e) => {
      if (comp === 'maior que') {
        return Number(e[col]) > Number(val);
      }
      if (comp === 'menor que') {
        return Number(e[col]) < Number(val);
      }
      if (comp === 'igual a') {
        return Number(e[col]) === Number(val);
      }
      return planets;
    });
    return newPlanets;
  };

  const newArrPlnts = () => {
    let newArr;
    filter.filterByNumericValues
      .forEach((e) => {
        newArr = filtering(e.column, e.comparison, e.value);
        setPlanets(newArr);
      });
  };

  const handleClick = () => {
    setNumericFilter(column, comparison, filterValue);
    const newColumns = columns.filter((e) => !e.includes(column));
    setColumns(newColumns);
    setColumn(newColumns[0]);
  };
  const handleRemove = (col) => {
    // reset planets
    setPlanets(all);
    // reset remove selected filter
    setColumns([...columns, col]);
    const newNumValues = filter.filterByNumericValues
      .filter((e) => !e.column.includes(col));
    setFilter(
      { ...filter,
        filterByNumericValues: newNumValues,
      },
    );
  };
  const handleRemoveAll = () => {
    setFilter(
      { ...filter,
        filterByNumericValues: [
          { column: '', comparison: '', value: '' },
        ] },
    );
    setColumns(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
    setColumn('population');
    setPlanets(all);
  };

  const handleSort = () => {
    setFilter(
      { ...filter,
        order: {
          column: sortCol,
          sort: sortOr,
        } },
    );
  };

  const handleSortChange = ({ target: { name, value } }) => {
    if (name === 'sortCol') {
      setSortCol(value);
    }
    if (name === 'sortOr') {
      setSortOr(value);
    }
  };

  useEffect(() => newArrPlnts(), [filter]);

  return (
    <form>
      <input
        name="name-filter"
        data-testid="name-filter"
        type="search"
        value={ filter.filterByName.name }
        onChange={ handleChange }
      />
      <select
        name="column-filter"
        data-testid="column-filter"
        value={ column }
        onChange={ handleChange }
      >
        {columns.map((x, i) => <option key={ i } value={ x }>{x}</option>)}
      </select>
      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value-filter"
        type="number"
        data-testid="value-filter"
        value={ filterValue }
        onChange={ handleChange }
      />
      <button
        name="button-filter"
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        filtrar
      </button>
      {filter.filterByNumericValues.map(
        (e, i) => e.column !== '' && (
          <section
            data-testid="filter"
            key={ i }
          >
            {`${e.column} ${e.comparison} ${e.value}`}
            <button onClick={ () => handleRemove(e.column) } type="button">X</button>
          </section>
        ),
      )}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAll }
      >
        Remover todas filtragens
      </button>
      <select
        name="sortCol"
        value={ sortCol }
        onChange={ handleSortChange }
        data-testid="column-sort"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          name="sortOr"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          type="radio"
          onChange={ handleSortChange }
          checked={ (sortOr === 'ASC') }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          name="sortOr"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          type="radio"
          onChange={ handleSortChange }
          checked={ (sortOr === 'DESC') }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
    </form>
  );
}
