export const SAVE_INFOS = 'SAVE_INFOS';
export const GET_TOKEN = 'GET_TOKEN';
export const WAIT_FETCH = 'WAIT_FETCH';
export const SEND_CLASS = 'SEND_CLASS';
export const DECREMENT_TIME = 'DECREMENT_TIME';
export const TOGGLE_DISABLE = 'TOGGLE_DISABLE';
export const SET_SCORE = 'SET_SCORE';
export const GET_IMAGE = 'GET_IMAGE';

export const setScoreAction = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const toggleDisableAction = () => ({
  type: TOGGLE_DISABLE,
});

export const decrementTimeAction = () => ({
  type: DECREMENT_TIME,
});

export const saveInfosAction = (name, gravatarEmail) => ({
  type: SAVE_INFOS,
  name,
  gravatarEmail,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export function fetchToken() {
  return async (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch(getToken(token.token)));
}

export const sendClassAction = (payload) => ({
  type: SEND_CLASS,
  payload,
});

export const getImage = (payload) => ({
  type: GET_IMAGE,
  payload,
});
