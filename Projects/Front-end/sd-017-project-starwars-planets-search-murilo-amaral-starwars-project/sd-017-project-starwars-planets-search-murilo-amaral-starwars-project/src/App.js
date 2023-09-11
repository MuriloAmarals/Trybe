import React from 'react';
import './App.css';
import StarWarsProvider from './components/StarWarsProvider';
import FilterProvider from './components/FilterProvider';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (

    <StarWarsProvider>
      <FilterProvider>
        <Filters />
        <Table />
      </FilterProvider>
    </StarWarsProvider>
  );
}

export default App;
