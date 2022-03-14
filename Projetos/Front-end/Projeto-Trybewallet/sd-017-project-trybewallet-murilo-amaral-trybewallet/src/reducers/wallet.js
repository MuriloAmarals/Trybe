// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GETCURRENCY, PICKUP_EXPENSE, SOMA, CURRENCIES_CODE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  soma: 0,
  exchangeRates: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PICKUP_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case SOMA:
    return { ...state, soma: Number(action.payload) + state.soma };
  case GETCURRENCY:
    return { ...state, exchangeRates: action.payload };
  case CURRENCIES_CODE:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
