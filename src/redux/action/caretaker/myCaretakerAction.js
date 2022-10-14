import * as types from '../../actionTypes';

export const myCaretakerRequest = payload => {
  console.log('caretaker', payload);
  return {
    type: types.MY_CARETAKER_REQUEST,
    payload,
  };
};
export const myCaretakerSuccess = payload => {
  return {
    type: types.MY_CARETAKER_SUCCESS,
    payload,
  };
};
export const myCaretakerError = payload => {
  return {
    type: types.MY_CARETAKER_ERROR,
    payload,
  };
};
