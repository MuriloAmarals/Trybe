import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../RenderWithRouter';

describe('Testando o componente App.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const element = screen.getAllByText(/pokémons/i);
    element.forEach((value) => {
      expect(value).toBeDefined();
      expect(value).toBeInTheDocument();
    });
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const element = screen.getByRole('heading', { name: /about pokédex/i });
    expect(element).toBeInTheDocument();
  });

  test('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(2);
  });

  test('Testando se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
