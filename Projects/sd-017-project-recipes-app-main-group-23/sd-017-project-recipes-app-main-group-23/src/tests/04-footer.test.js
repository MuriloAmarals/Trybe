import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

describe('Verifica se o footer é renderizado nas páginas corretas', () => {
  it('Não tem footer na tela de login', () => {
    renderWithRouterAndContext(<App />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/53060');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de uma receita em progresso de comida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/53060/in-progress');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks/15997');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de uma receita em progresso de bebida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks/15997/in-progresss');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de uma receitas feitas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de uma receitas favoritas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/favorite-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Tem footer na tela principal de comidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela principal de bebidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de perfil', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas ou bebidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/ingredients');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por nacionalidade', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/nationalities');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/drinks/ingredients');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});

describe('Verifica os botões do footer', () => {
  it('Verifica se existe os botões corretos', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    const iconExplore = screen.getByTestId('explore-bottom-btn');
    const iconFoods = screen.getByTestId('food-bottom-btn');
    expect(iconDrink).toBeInTheDocument();
    expect(iconExplore).toBeInTheDocument();
    expect(iconFoods).toBeInTheDocument();
  });

  it('Verifica se os botões redirecionam para as páginas corretas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    const iconExplore = screen.getByTestId('explore-bottom-btn');
    const iconFoods = screen.getByTestId('food-bottom-btn');
    userEvent.click(iconDrink);
    const pathnameDrink = history.location.pathname;
    expect(pathnameDrink).toBe('/drinks');
    userEvent.click(iconExplore);
    const pathnameExplore = history.location.pathname;
    expect(pathnameExplore).toBe('/explore');
    userEvent.click(iconFoods);
    const pathnameFoods = history.location.pathname;
    expect(pathnameFoods).toBe('/foods');
  });
});
