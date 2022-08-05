import { SAVE_INFOS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const player = (state = INITIAL_STATE, action) => {
  const { name, gravatarEmail } = action;
  switch (action.type) {
  case SAVE_INFOS:
    return { ...state, name, gravatarEmail };
  default:
    return state;
  }
};

export default player;
