import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

const DATA_TEST = '0-card-img';

describe('Testa a tela principal de bebidas ou comidas', () => {
  it('Verifica se ao renderizar a tela de comidas, aparece 12 receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
  });

  it('Verifica se ao renderizar a tela de bebidas, aparece 12 receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
  });

  it(
    'Verifica se marcar o filtro e desmarcar, o filtro é removido',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
      const checkbox = await screen.findByTestId('Cocktail-category-filter');
      userEvent.click(checkbox);
      const recipe = await screen.findByText('155 Belmont');
      expect(recipe).toBeInTheDocument();
      userEvent.click(checkbox);
      const otherRecipe = await screen.findByText('GG');
      expect(otherRecipe).toBeInTheDocument();
    },
  );

  it(
    'Verifica se marcar o filtro de todas as bebidas, aparece 12 receitas',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
      const checkbox = await screen.findByTestId('All-category-filter');
      userEvent.click(checkbox);
      const otherRecipe = await screen.findByText('GG');
      expect(otherRecipe).toBeInTheDocument();
    },
  );

  it('Verifica se o card da receita está correto', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
    const imageRecipe = screen.getByTestId(DATA_TEST);
    const titleRecipe = screen.getByTestId('0-card-name');
    const urlImage = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';

    expect(imageRecipe).toHaveProperty('src', urlImage);
    expect(titleRecipe.innerHTML).toBe('Corba');
  });

  it(
    'Verifica se ao clicar no card de uma comida é redirecionado para a tela de detalhes',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const recipe = await screen.findByTestId(DATA_TEST);
      userEvent.click(recipe);
      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52977');
    },
  );

  it(
    'Verifica se ao clicar no card de uma bebida é redirecionado para a tela de detalhes',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
      const recipe = await screen.findByTestId(DATA_TEST);
      userEvent.click(recipe);
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/15997');
    },
  );
});
