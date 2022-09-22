import * as types from '../../actionTypes';

export const editProfileRequest = payload => {
  return {
    type: types.EDIT_PROFILE_REQUEST,
    payload,
  };
};
export const editProfileSuccess = payload => {
  console.log('action', payload);
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    payload,
  };
};
export const editProfileError = payload => {
  return {
    type: types.EDIT_PROFILE_ERROR,
    payload,
  };
};
