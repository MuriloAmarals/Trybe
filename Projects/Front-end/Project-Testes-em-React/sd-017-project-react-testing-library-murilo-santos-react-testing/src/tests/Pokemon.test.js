import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import pokemons from '../data';
import App from '../App';

const moreDetails = 'More details';

describe('Testando componente Pokemon', () => {
  test('Testando se é renderizado um card de determinado pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((value) => {
      expect(within(screen.queryByTestId('pokemon-name'))
        .getByText(value.name)).toBeInTheDocument();
      expect(within(screen.queryByTestId('pokemon-type'))
        .getByText(value.type)).toBeInTheDocument();
      expect(within(screen.queryByTestId('pokemon-weight'))
        .getByText((`Average weight: ${
          value.averageWeight.value} ${value.averageWeight.measurementUnit}`
        ))).toBeInTheDocument();
      const img = screen.queryByAltText(`${value.name} sprite`);
      expect(img).toHaveAttribute('alt', `${value.name} sprite`);
      expect(img).toHaveAttribute('src', value.image);
      fireEvent.click(button);
    });
  });
  test('Testando se o card do Pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  test('Testando se ao clicar no link de navegação do Pokémon é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testando se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkToDetails);
    const favPokemon = screen.getByRole('checkbox');
    expect(favPokemon.checked).toBeFalsy();
    userEvent.click(favPokemon);
    const favStarIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favStarIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
