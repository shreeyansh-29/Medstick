import * as types from '../../actionTypes';

export const sendSnapRequest = payload => {
  console.log(payload);
  return {
    type: types.SEND_SNAP_REQUEST,
    payload,
  };
};
export const sendSnapSuccess = payload => {
  return {
    type: types.SEND_SNAP_SUCCESS,
    payload,
  };
};
export const sendSnapError = payload => {
  return {
    type: types.SEND_SNAP_ERROR,
    payload,
  };
};
