import * as types from '../../actionTypes';

export const caretakerRequest = payload => {
  console.log("action request")
  return {
    type: types.MY_CARETAKER_REQUEST,
    payload,
  };
};
export const caretakerSuccess = payload => {
  console.log("action success");
  return {
    type: types.MY_CARETAKER_SUCCESS,
    payload,
  }; 
};
export const caretakerError = payload => {
  console.log("action error")
  return {
    type: types.MY_CARETAKER_ERROR,
    payload,
  };
};

