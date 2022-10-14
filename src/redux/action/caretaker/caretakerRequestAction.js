import * as types from '../../actionTypes';

export const caretakerReqRequest = payload => {
  // console.log(payload);
  return {
    type: types.CARETAKER_REQ_REQUEST,
    payload,
  };
};
export const caretakerReqSuccess = payload => {
  return {
    type: types.CARETAKER_REQ_SUCCESS,
    payload,
  };
};
export const caretakerReqError = payload => {
  return {
    type: types.CARETAKER_REQ_ERROR,
    payload,
  };
};
