import * as types from '../../actionTypes';

export const caretakerRequestRequest = payload => {
  return {
    type: types.CARETAKER_REQUEST_REQUEST,
    payload,
  };
};
export const caretakerRequestSuccess = payload => {
  return {
    type: types.CARETAKER_REQUEST_SUCCESS,
    payload,
  };
};
export const caretakerRequestError = payload => {
  return {
    type: types.CARETAKER_REQUEST_ERROR,
    payload,
  };
};


