import * as types from '../../actionTypes';

export const getMedsHistoryRequest = payload => {
  return {
    type: types.GET_MED_HISTORY_REQUEST,
    payload,
  };
};
export const getMedsHistorySuccess = payload => {
  return {
    type: types.GET_MED_HISTORY_SUCCESS,
    payload,
  };
};
export const getMedsHistoryError = payload => {
  return {
    type: types.GET_MED_HISTORY_ERROR,
    payload,
  };
};
