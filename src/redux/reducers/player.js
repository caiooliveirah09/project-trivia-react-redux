import { DECREMENT_TIME, GET_TOKEN, SAVE_INFOS,
  SEND_CLASS, SET_SCORE, TOGGLE_DISABLE } from '../actions';

const INITIAL_STATE = {

  name: '',
  score: 0,
  gravatarEmail: '',

  token: '',
  isFetch: false,
  classes: {},
  timer: 30,
  isButtonDisable: false,
};

const player = (state = INITIAL_STATE, action) => {
  const { name, gravatarEmail, token, payload } = action;
  console.log(payload);
  switch (action.type) {
  case SAVE_INFOS:
    return { ...state, name, gravatarEmail };
  case GET_TOKEN:
    return { ...state, token, isFetch: false };
  case SEND_CLASS:
    return { ...state, classes: action.payload };
  case DECREMENT_TIME:
    return { ...state, timer: state.timer - 1 };
  case TOGGLE_DISABLE:
    return { ...state, isButtonDisable: !state.isButtonDisable };
  case SET_SCORE: return { ...state, score: state.score + payload };
  default:
    return state;
  }
};

export default player;
