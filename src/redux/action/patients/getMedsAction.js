import * as types from '../../actionTypes';

export const getMedsRequest = payload => {
  return {
    type: types.GET_MED_HISTORY_REQUEST,
    payload,
  };
};
export const getMedsSuccess = payload => {
  return {
    type: types.GET_MED_HISTORY_SUCCESS,
    payload,
  };
};
export const getMedsError = payload => {
  return {
    type: types.GET_MED_HISTORY_ERROR,
    payload,
  };
};
