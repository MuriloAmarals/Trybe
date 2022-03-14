import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

// https://testing-library.com/docs/react-testing-library/example-intro
// utilizei desse documento e da ajuda do meu amigo Matheus Benini - Turma 16
// na realização desse projeto de RTL

describe('Testando o componente App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('testando se possui o conteúdo "Home", "About" and "Favorites Pokémons"', () => {
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritesPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritesPokemons).toBeInTheDocument();
  });

  test('testando o redirecionamento ao clicar em "Home"', () => {
    const homeComponent = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeComponent);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('testando o redirecionamento ao clicar em "About"', () => {
    const aboutComponent = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutComponent);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  test('testando o redirecionamento ao clicar em "Favorite Pokémons"', () => {
    const favPokemonsComponent = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favPokemonsComponent);
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('Testando o redirecionamento para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/naoexiste');

    const notFoundTextEl = screen.getByText(/Page requested not found/i);
    expect(notFoundTextEl).toBeInTheDocument();
  });
});
