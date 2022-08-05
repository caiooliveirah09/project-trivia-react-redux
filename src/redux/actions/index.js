export const SAVE_INFOS = 'SAVE_INFOS';

export const saveInfosAction = (name, gravatarEmail) => ({
  type: SAVE_INFOS,
  name,
  gravatarEmail,
});
