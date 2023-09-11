import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const FOODS_IN_PROGRESS = '/foods/52771/in-progress';
const FINISH_BUTTON = 'finish-recipe-btn';

describe('Testa a tela de receitas em progresso', () => {
  it('Testa se existe um botão de finalizar receita e se ele está desabilitado',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(FOODS_IN_PROGRESS);
      const buttonFinish = await screen.findByTestId(FINISH_BUTTON);
      expect(buttonFinish).toHaveProperty('disabled', true);
    });

  it('Verifica se ao clicar em todos os checkbox o botão habilita',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(FOODS_IN_PROGRESS);
      const stepIngredients = await screen.findAllByTestId(/ingredient-step/i);
      const buttonFinish = await screen.findByTestId(FINISH_BUTTON);
      stepIngredients.forEach((ingredient) => userEvent.click(ingredient));
      expect(buttonFinish).toHaveProperty('disabled', false);
    });

  it('Verifica se ao clicar em finalizar, redireciona para a /done-recipes',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods/52971/in-progress');
      const stepIngredients = await screen.findAllByTestId(/ingredient-step/i);
      const buttonFinish = await screen.findByTestId(FINISH_BUTTON);
      stepIngredients.forEach((ingredient) => userEvent.click(ingredient));
      expect(buttonFinish).toHaveProperty('disabled', false);
      userEvent.click(buttonFinish);
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
});
