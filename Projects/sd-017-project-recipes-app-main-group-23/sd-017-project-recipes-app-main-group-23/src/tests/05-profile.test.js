import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

describe('Testa a tela de perfil', () => {
  it('Verifica se ao clicar no botão de sair, o localStorage é limpo', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
