const initialState = {
  rached: '',
  name: '',
  token: '',
  player: { score: 0 },
  questions: [],
  ranking: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'RACHED':
    return {
      ...state,
      rached: action.payload,
    };
  case 'TOKEN':
    return {
      ...state,
      token: action.payload,
    };

  case 'QUESTIONS':
    return {
      ...state,
      questions: action.payload,
    };
  case 'ADD_SCORE':
    return {
      ...state,
      player: { ...state.player, score: action.payload },
    };
  case 'SET_USER_INFO':
    return {
      ...state,
      player: action.payload,
    };
  case 'SET_RANKING':
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
};

export default reducer;
