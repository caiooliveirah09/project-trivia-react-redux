import { GET_TOKEN, SAVE_INFOS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  isFetch: false,
};

const player = (state = INITIAL_STATE, action) => {
  const { name, gravatarEmail, token } = action;
  switch (action.type) {
  case SAVE_INFOS:
    return { ...state, name, gravatarEmail };
  case GET_TOKEN:
    return { ...state, token, isFetch: false };
  default:
    return state;
  }
};

export default player;
