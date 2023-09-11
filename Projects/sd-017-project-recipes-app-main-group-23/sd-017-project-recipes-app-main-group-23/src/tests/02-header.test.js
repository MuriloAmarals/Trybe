import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const searchBtnDataTest = 'search-top-btn';
const pathnameDoneRecipes = '/done-recipes';

describe('Verifica se o header é renderizado nas páginas corretas', () => {
  it('Não tem header na tela de login', () => {
    renderWithRouterAndContext(<App />);
    const header = screen.queryByRole('banner');
    expect(header).not.toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52771');
    const header = screen.queryByRole('banner');
    expect(header).not.toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('drinks/178319');
    const header = screen.queryByRole('banner');
    expect(header).not.toBeInTheDocument();
  });

  it('Não tem header na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52771/in-progress');
    const header = screen.queryByRole('banner');
    expect(header).not.toBeInTheDocument();
  });

  it('Não tem header na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks/178319/in-progress');
    const header = screen.queryByRole('banner');
    expect(header).not.toBeInTheDocument();
  });

  it('Tem header na tela de comidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de bebidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar comidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar bebidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/drinks');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/ingredients');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/drinks/ingredients');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de explorar comidas por nacionalidade', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/nationalities');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de perfil', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de receitas feitas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(pathnameDoneRecipes);
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Tem header na tela de receitas favoritas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/favorite-recipes');
    const header = screen.queryByRole('banner');
    expect(header).toBeInTheDocument();
  });
});

describe('Verifica os componentes do header', () => {
  it('Verifica se existe um header na página', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Verifica se o header possui um icone de perfil', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });

  it('Verifica se o header possui um título da página', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    let pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Foods');
    history.push('/drinks');
    pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Drinks');
  });

  it('Verifica se o header possui um icone de pesquisar receita', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(searchBtnDataTest);
    expect(searchBtn).toBeInTheDocument();
  });

  it(
    'Verifica se ao clicar no icone de pesquisar, aparece um input e 3 radio buttons',
    () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      expect(searchBtn).toBeInTheDocument();
      userEvent.click(searchBtn);
      const inputSearch = screen.getByTestId('search-input');
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      const nameRadio = screen.getByTestId('name-search-radio');
      const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
      expect(inputSearch).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(nameRadio).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
    },
  );

  it(
    'Verifica se ao clicar no icone de perfil, redireciona para /profile',
    () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const profileBtn = screen.getByTestId('profile-top-btn');
      expect(profileBtn).toBeInTheDocument();
      userEvent.click(profileBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/profile');
    },
  );
});

describe('Verifica se as telas de explorar tem os componentes corretos no header', () => {
  it('Não tem o icone search no header na tela de explorar', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Não tem o icone search no header na tela de explorar comidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods');
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
    history.push('/explore/foods/ingredients');
    expect(searchBtn).not.toBeInTheDocument();
    history.push('/explore/foods/nationalities');
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Não tem o icone search no header na tela de explorar bebidas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/drinks');
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
    history.push('/explore/ingredients');
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Não tem o icone search no header na tela de perfil', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Não tem o icone search no header na tela de receitas feitas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(pathnameDoneRecipes);
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Não tem o icone search no header na tela de receitas favoritas', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/favorite-recipes');
    const searchBtn = screen.queryByTestId(searchBtnDataTest);
    expect(searchBtn).not.toBeInTheDocument();
  });
});
