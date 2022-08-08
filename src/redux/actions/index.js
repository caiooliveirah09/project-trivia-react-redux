export const SAVE_INFOS = 'SAVE_INFOS';
export const GET_TOKEN = 'GET_TOKEN';
export const WAIT_FETCH = 'WAIT_FETCH';
export const SEND_CLASS = 'SEND_CLASS';

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
