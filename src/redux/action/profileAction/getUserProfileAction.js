import * as types from '../../actionTypes';

export const getUserProfileRequest = payload => {
  return {
    type: types.USER_PROFILE_REQUEST,
    payload,
  };
};
export const getUserProfileSuccess = payload => {
  return {
    type: types.USER_PROFILE_SUCCESS,
    payload,
  };
};
export const getUserProfileError = payload => {
  return {
    type: types.USER_PROFILE_ERROR,
    payload,
  };
};
