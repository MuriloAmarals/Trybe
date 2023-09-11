import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const searchBtnDataTest = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH = 'exec-search-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';

describe('Testa o input search do header', () => {
  afterEach(() => jest.clearAllMocks());
  it(
    'Verifica se ao clicar no radio button, ele é selecionado',
    () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      expect(searchBtn).toBeInTheDocument();
      userEvent.click(searchBtn);
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      userEvent.click(ingredientRadio);
      expect(ingredientRadio).toHaveProperty('checked');
      expect(nameRadio).toHaveProperty('checked', false);
      expect(firstLetterRadio).toHaveProperty('checked', false);
      userEvent.click(nameRadio);
      expect(nameRadio).toHaveProperty('checked');
      expect(ingredientRadio).toHaveProperty('checked', false);
      expect(firstLetterRadio).toHaveProperty('checked', false);
      userEvent.click(firstLetterRadio);
      expect(firstLetterRadio).toHaveProperty('checked');
      expect(ingredientRadio).toHaveProperty('checked', false);
      expect(nameRadio).toHaveProperty('checked', false);
    },
  );

  it(
    'Verifica se é possivel digitar no input',
    () => {
      const { history } = renderWithRouterAndContext(<App />);
      const text = 'testando';
      history.push('/foods');
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      expect(searchBtn).toBeInTheDocument();
      userEvent.click(searchBtn);
      const inputSearch = screen.getByTestId(SEARCH_INPUT);
      expect(inputSearch).toBeInTheDocument();
      userEvent.type(inputSearch, text);
      expect(inputSearch).toHaveValue(text);
    },
  );

  it(
    'Se escolher a opção firstLetter e tiver mais de uma letra, dispara um alerta',
    () => {
      const { history } = renderWithRouterAndContext(<App />);
      const alert = 'Your search must have only 1 (one) character';
      history.push('/foods');
      // mock do global.alert
      // link: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
      global.alert = jest.fn();
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      userEvent.click(searchBtn);
      const inputSearch = screen.getByTestId(SEARCH_INPUT);
      const searchBtnExec = screen.getByTestId(EXEC_SEARCH);
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      userEvent.type(inputSearch, 'letter');
      userEvent.click(firstLetterRadio);
      userEvent.click(searchBtnExec);
      expect(global.alert).toBeCalledWith(alert);
    },
  );

  it(
    'Verifica se pesquisar por nome funciona corretamente na pagina de comidas',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      userEvent.click(searchBtn);
      const inputSearch = screen.getByTestId(SEARCH_INPUT);
      const searchBtnExec = screen.getByTestId(EXEC_SEARCH);
      const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(nameRadio);
      userEvent.click(searchBtnExec);
      const recipe = await screen.findByText('Chicken Handi');
      expect(recipe).toBeInTheDocument();
    },
  );

  it(
    'Verifica se pesquisar por ingrediente funciona corretamente',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
      const searchBtn = screen.getByTestId(searchBtnDataTest);
      userEvent.click(searchBtn);
      const inputSearch = screen.getByTestId(SEARCH_INPUT);
      const searchBtnExec = screen.getByTestId('exec-search-btn');
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(searchBtnExec);
      const recipe = await screen.findByText('Brown Stew Chicken');
      expect(recipe).toBeInTheDocument();
    },
  );
});
