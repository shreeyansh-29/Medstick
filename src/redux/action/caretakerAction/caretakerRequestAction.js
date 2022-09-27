import * as types from '../../actionTypes';

export const listCaretakerRequest = payload => {
  return {
    type: types.CARETAKER_LIST_REQUEST,
    payload,
  };
};
export const listCaretakerSuccess = payload => {
  return {
    type: types.CARETAKER_LIST_SUCCESS,
    payload,
  };
};
export const listCaretakerError = payload => {
  return {
    type: types.CARETAKER_LIST_ERROR,
    payload,
  };
};


