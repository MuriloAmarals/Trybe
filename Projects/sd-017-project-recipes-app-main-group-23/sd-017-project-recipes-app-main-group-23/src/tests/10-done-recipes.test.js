import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';
import doneRecipes from './mocks/doneRecipes';

const PATHNAME_DONERECIPES = '/done-recipes';

// para funcionar o clipboard, tive que mockar a função
// site: https://www.buzzphp.com/posts/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa a tela de receitas feitas', () => {
  it('Testa se os botões do filtro estão na tela ', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_DONERECIPES);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnFood = screen.getByTestId('filter-by-food-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');

    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });

  it('Testa se as receitas estão na tela ', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(PATHNAME_DONERECIPES);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 3;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('Testa se clicar no filtro de comidas, aparece as receitas corretas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(PATHNAME_DONERECIPES);
    const btnFood = screen.getByTestId('filter-by-food-btn');
    userEvent.click(btnFood);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 2;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('Testa se clicar no filtro de bebidas, aparece as receitas corretas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(PATHNAME_DONERECIPES);
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrink);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 1;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('Testa o filtro de todas as receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(PATHNAME_DONERECIPES);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(btnAll);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 3;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('Testa o de compartilhar a receita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_DONERECIPES);
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
