import React from 'react';
import { useHistory } from 'react-router-dom';

function Explore() {
  const history = useHistory();

  return (
    <main className="explore-container">
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
    </main>
  );
}

export default Explore;
