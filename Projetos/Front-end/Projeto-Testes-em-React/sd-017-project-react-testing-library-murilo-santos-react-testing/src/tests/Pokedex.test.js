import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';
import renderWithRouter from '../RenderWithRouter';

describe('Testando o componente Pokedex', () => {
  test('Testando se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </App>,
    );
    const element = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(element).toBeInTheDocument();
  });

  test('Testando se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemn = screen.getByRole('button', {
      name: (/Próximo pokémon/i),
    });
    expect(nextPokemn).toBeDefined();
    userEvent.click(nextPokemn);
    expect(screen.getByText('Charmander')).toBeDefined();
  });

  test('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  test('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const filterLength = 7;
    expect(filterTypeBtn).toHaveLength(filterLength);

    pokemons.forEach(({ type }) => {
      const buttonType = screen.getByRole('button', {
        name: type,
      });
      expect(buttonType).toBeDefined();
    });
  });

  test('Testando se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(resetButton).toBeDefined();

    userEvent.click(resetButton);
    const defaultPokemon = screen.getByText('Pikachu');
    expect(defaultPokemon).toBeDefined();
  });
});
