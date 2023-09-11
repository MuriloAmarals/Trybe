import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const PATHNAME_EXPLORE_FOODS = '/explore/foods';

describe('Testa a tela explore', () => {
  it('Testa se o botão de comidas redireciona para a /explore/foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    const btnFoods = screen.getByTestId('explore-foods');
    userEvent.click(btnFoods);
    const { pathname } = history.location;
    expect(pathname).toBe(PATHNAME_EXPLORE_FOODS);
  });

  it('Testa se o botão de bebidas redireciona para a /explore/drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    const btnDrinks = screen.getByTestId('explore-drinks');
    userEvent.click(btnDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });

  it(`Testa se o botão de ingredientes redireciona para a /explore/foods/ingredients na 
  tela de explorar comidas`, () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_EXPLORE_FOODS);

    const btnIngredients = screen.getByTestId('explore-by-ingredient');
    userEvent.click(btnIngredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/ingredients');
  });

  it(
    `Testa se ao clicar em um ingrediente redireciona para a /foods na tela de comidas
    e mostra as comidas corretas`, async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/foods/ingredients');

      const chickenIngredient = await screen.findByText('Chicken');
      userEvent.click(chickenIngredient);
      const recipe = await screen.findByText('Brown Stew Chicken');
      expect(recipe).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/foods');
    },
  );

  it(
    `Testa se ao clicar em um ingrediente redireciona para a /drinks na tela de bebidas
    e mostra as bebidas corretas`, async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/drinks/ingredients');

      const drinkIngredient = await screen.findByText('Light rum');
      userEvent.click(drinkIngredient);
      const recipe = await screen.findByText('151 Florida Bushwacker');
      expect(recipe).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    },
  );
});
