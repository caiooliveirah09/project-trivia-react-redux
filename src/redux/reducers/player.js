import { ACTIVATE_NEXT_BUTTON, DECREMENT_TIME,
  GET_IMAGE, GET_TOKEN, NEXT_QUESTION, SAVE_INFOS,
  SEND_CLASS, SET_BUTTONS, SET_SCORE, TOGGLE_DISABLE } from '../actions';

const INITIAL_STATE = {

  name: '',
  score: 0,
  gravatarEmail: '',
  imageSRC: '',

  token: '',
  isFetch: false,
  classes: {},
  timer: 30,
  isButtonDisable: false,
  index: 0,
  buttons: [],
  nextButton: false,
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
  case GET_IMAGE:
    return { ...state, imageSRC: action.payload };
  case SET_SCORE:
    return { ...state, score: state.score + payload };
  case NEXT_QUESTION:
    return { ...state, index: state.index + 1 };
  case SET_BUTTONS:
    return { ...state, buttons: payload };
  case ACTIVATE_NEXT_BUTTON:
    return { ...state, nextButton: true };
  default:
    return state;
  }
};

export default player;
