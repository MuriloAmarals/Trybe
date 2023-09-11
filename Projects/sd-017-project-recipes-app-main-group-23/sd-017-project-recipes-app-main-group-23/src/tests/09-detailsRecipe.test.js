import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

const PATHNAME_FOODS = '/foods/52977';
const DATA_TEST_START_BTN = 'start-recipe-btn';
const FAVORITE_BTN = 'favorite-btn';

// para funcionar o clipboard, tive que mockar a função
// site: https://www.buzzphp.com/posts/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa a tela de detalhes de bebida e comida', () => {
  it('Todos os componentes estão na tela de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_FOODS);
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    const ingredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const startRecipe = await screen.findByTestId(DATA_TEST_START_BTN);
    const recommendationCard = await screen.findAllByTestId(/0-recomendation-card/i);

    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    ingredients.forEach((element) => expect(element).toBeInTheDocument());
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(startRecipe).toBeInTheDocument();
    recommendationCard.forEach((element) => expect(element).toBeInTheDocument());
  });

  /*   it('Verifica o botão de compartilhar', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52977');
    const copy = jest.spyOn(window, 'execCommand');
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(copy).toHaveBeenCalledWith('copy');
    expect(shareBtn.innerHTML).toBe('Link copied!');
  }); */

  it('Verifica o botão de favoritar ', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_FOODS);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    userEvent.click(favoriteBtn);
  });

  it(
    'Verifica se clicar em "Start recipe", é redirecionado para a pagina correta',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(PATHNAME_FOODS);
      const startRecipe = await screen.findByTestId(DATA_TEST_START_BTN);
      userEvent.click(startRecipe);
      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52977/in-progress');
    },
  );

  it(
    'Verifica se clicar em "Start recipe", e depois voltar, o texto está Continue Recipe',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods/52785/in-progress');
      const firstIngredient = await screen.findByTestId('0-ingredient-step');
      userEvent.click(firstIngredient);
      history.push('/foods/52785');
      const startRecipe = await screen.findByTestId(DATA_TEST_START_BTN);
      expect(startRecipe.innerHTML).toBe('Continue Recipe');
    },
  );

  it(
    'Verifica se é possivel favoritar uma receita',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods/53026');
      const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
      localStorage.clear();
      userEvent.click(favoriteBtn);
      const favRecipeInLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favRecipeInLocalStorage[0].id).toBe('53026');
      expect(favoriteBtn).toHaveProperty('alt', 'favorite icon black');
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveProperty('alt', 'favorite icon');
    },
  );

  it(
    'Verifica se é possivel compartilhar a receita',
    async () => {
      jest.spyOn(navigator.clipboard, 'writeText');
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods/53026');
      const btnShare = await screen.findByTestId('share-btn');
      userEvent.click(btnShare);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    },
  );
});
