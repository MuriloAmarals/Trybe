// Coloque aqui suas actions
import getApi from '../Api';

export const USER_LOGIN = 'USER_LOGIN';
export const SOMA = 'SOMA';
export const GETCURRENCY = 'GETCURRENCY';
export const PICKUP_EXPENSE = 'PICKUP_EXPENSE';
export const CURRENCIES_CODE = 'CURRENCIES_CODE';

export function emailToStore(email) {
  return {
    type: USER_LOGIN,
    email,
  };
}

export function somaTotal(payload) {
  return {
    type: SOMA,
    payload,
  };
}

export function getCurrency(payload) {
  return {
    type: GETCURRENCY,
    payload,
  };
}

export function expenseToStore(payload) {
  return {
    type: PICKUP_EXPENSE,
    payload,
  };
}

export function requestAPI() {
  return (dispatch) => getApi().then((data) => dispatch(getCurrency(data)));
}

export function currenciesCode(payload) {
  return {
    type: CURRENCIES_CODE,
    payload,
  };
}

export function exportCurrencies() {
  return (dispatch) => getApi()
    .then((data) => Object.keys(data).filter((coins) => coins !== 'USDT'))
    .then((keys) => dispatch(currenciesCode(keys)));
}
