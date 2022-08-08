import { GET_TOKEN, SAVE_INFOS, SEND_CLASS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  isFetch: false,
  classes: {},
};

const player = (state = INITIAL_STATE, action) => {
  const { name, gravatarEmail, token } = action;
  switch (action.type) {
  case SAVE_INFOS:
    return { ...state, name, gravatarEmail };
  case GET_TOKEN:
    return { ...state, token, isFetch: false };
  case SEND_CLASS: return { ...state, classes: action.payload };
  default:
    return state;
  }
};

export default player;
