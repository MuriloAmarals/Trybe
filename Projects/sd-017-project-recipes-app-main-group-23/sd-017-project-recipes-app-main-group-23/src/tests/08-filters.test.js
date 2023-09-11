import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

const TESTID_ALL = 'All-category-filter';

describe('Testa o filtro da pagina pricipal de bebidas e comidas', () => {
  it('Verifica se os inputs do tipo checkbox estão na tela de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const inputBeef = await screen.findByTestId('Beef-category-filter');
    const inputBreackfast = await screen.findByTestId('Breakfast-category-filter');
    const inputChicken = await screen.findByTestId('Chicken-category-filter');
    const inputDessert = await screen.findByTestId('Dessert-category-filter');
    const inputGoat = await screen.findByTestId('Goat-category-filter');
    const inputAll = await screen.findByTestId(TESTID_ALL);

    expect(inputBeef).toBeInTheDocument();
    expect(inputBreackfast).toBeInTheDocument();
    expect(inputChicken).toBeInTheDocument();
    expect(inputDessert).toBeInTheDocument();
    expect(inputGoat).toBeInTheDocument();
    expect(inputAll).toBeInTheDocument();
  });

  it('Verifica se os inputs do tipo checkbox estão na tela de bebidas ', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const inputOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');
    const inputCocktail = await screen.findByTestId('Cocktail-category-filter');
    const inputShake = await screen.findByTestId('Shake-category-filter');
    const inputOther = await screen.findByTestId('Other/Unknown-category-filter');
    const inputCocoa = await screen.findByTestId('Cocoa-category-filter');
    const inputAll = await screen.findByTestId(TESTID_ALL);

    expect(inputOrdinary).toBeInTheDocument();
    expect(inputCocktail).toBeInTheDocument();
    expect(inputShake).toBeInTheDocument();
    expect(inputOther).toBeInTheDocument();
    expect(inputCocoa).toBeInTheDocument();
    expect(inputAll).toBeInTheDocument();
  });

  it('Verifica se é possivel selecionar os inputs na tela de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const inputBeef = await screen.findByTestId('Beef-category-filter');
    const inputBreackfast = await screen.findByTestId('Breakfast-category-filter');
    const inputChicken = await screen.findByTestId('Chicken-category-filter');
    const inputDessert = await screen.findByTestId('Dessert-category-filter');
    const inputGoat = await screen.findByTestId('Goat-category-filter');
    const inputAll = await screen.findByTestId(TESTID_ALL);
    userEvent.click(inputBeef);
    expect(inputBeef).toHaveProperty('checked', true);
    userEvent.click(inputBreackfast);
    expect(inputBreackfast).toHaveProperty('checked', true);
    userEvent.click(inputChicken);
    expect(inputChicken).toHaveProperty('checked', true);
    userEvent.click(inputDessert);
    expect(inputDessert).toHaveProperty('checked', true);
    userEvent.click(inputGoat);
    expect(inputGoat).toHaveProperty('checked', true);
    userEvent.click(inputAll);
    expect(inputAll).toHaveProperty('checked', true);
  });

  it('Verifica se é possivel selecionar os inputs na tela de bebidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const inputOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');
    const inputCocktail = await screen.findByTestId('Cocktail-category-filter');
    const inputShake = await screen.findByTestId('Shake-category-filter');
    const inputOther = await screen.findByTestId('Other/Unknown-category-filter');
    const inputCocoa = await screen.findByTestId('Cocoa-category-filter');
    const inputAll = await screen.findByTestId(TESTID_ALL);
    userEvent.click(inputOrdinary);
    expect(inputOrdinary).toHaveProperty('checked', true);
    userEvent.click(inputCocktail);
    expect(inputCocktail).toHaveProperty('checked', true);
    userEvent.click(inputShake);
    expect(inputShake).toHaveProperty('checked', true);
    userEvent.click(inputOther);
    expect(inputOther).toHaveProperty('checked', true);
    userEvent.click(inputCocoa);
    expect(inputCocoa).toHaveProperty('checked', true);
    userEvent.click(inputAll);
    expect(inputAll).toHaveProperty('checked', true);
  });
});
