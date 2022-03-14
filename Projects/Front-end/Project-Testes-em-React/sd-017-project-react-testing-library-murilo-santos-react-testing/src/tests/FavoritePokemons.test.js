import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../RenderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  test('Testando se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeDefined();
  });

  test('Testando se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favCards = screen.queryAllByTestId('pokemon-name');
    expect(favCards.length).toEqual(pokemons.length);
    favCards.forEach((value) => {
      expect(value).toBeInTheDocument();
    });
  });
});
