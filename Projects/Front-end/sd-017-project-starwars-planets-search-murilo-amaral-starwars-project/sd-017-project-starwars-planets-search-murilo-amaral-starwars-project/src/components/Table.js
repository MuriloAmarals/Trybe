import React, { useContext } from 'react';
import { FilterContext } from './FilterProvider';
import { StarWarsContext } from './StarWarsProvider';

export default function Table() {
  const { planets } = useContext(StarWarsContext);
  const { filter } = useContext(FilterContext);

  const unkownSort = (sortedPlanets) => {
    const unkos = [];
    if (filter.order.culumn !== 'name') {
      sortedPlanets.forEach((element) => {
        if (element[filter.order.column] === 'unknown') {
          unkos.push(element);
        }
      });
      sortedPlanets = sortedPlanets.filter((e) => e[filter.order.column] !== 'unknown');
      unkos.forEach((el) => {
        sortedPlanets.push(el);
      });
    }
    return sortedPlanets;
  };

  const sortPlanets = () => {
    const one = 1;
    const minusOne = -1;
    let sortedPlanets;
    if (filter.order.column === 'name') {
      planets.sort(
        (a, b) => ((a.name < b.name) ? one : minusOne),
      );
    }
    if (filter.order.sort === 'ASC') {
      sortedPlanets = planets.sort(
        (a, b) => (
          (Number(a[filter.order.column])
            > Number(b[filter.order.column])) ? one : minusOne
        ),
      );
    } else if (filter.order.sort === 'DESC') {
      sortedPlanets = planets.sort(
        (a, b) => (
          (Number(a[filter.order.column])
            > Number(b[filter.order.column])) ? minusOne : one
        ),
      );
    }

    sortedPlanets = unkownSort(sortedPlanets);
    return sortedPlanets;
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {sortPlanets()
            .filter((planet) => planet.name.includes(filter.filterByName.name))
            .map((planet, index) => (
              <tr key={ `planet-${index}` }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((e, i) => <p key={ `film-${i}` }>{e}</p>)}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
