import * as types from '../../actionTypes';

export const caretakerRequest = payload => {
  return {
    type: types.MY_CARETAKER_REQUEST,
    payload,
  };
};
export const caretakerSuccess = payload => {
  return {
    type: types.MY_CARETAKER_SUCCESS,
    payload,
  };
};
export const caretakerError = payload => {
  return {
    type: types.MY_CARETAKER_ERROR,
    payload,
  };
};

