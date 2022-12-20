import * as types from '../../actionTypes';

export const myPrescriptionsRequest = payload => {
  return {
    type: types.MY_PRESCRIPTIONS_REQUEST,
    payload,
  };
};
export const myPrescriptionsSuccess = payload => {
  return {
    type: types.MY_PRESCRIPTIONS_SUCCESS,
    payload,
  };
};
export const myPrescriptionsError = payload => {
  return {
    type: types.MY_PRESCRIPTIONS_ERROR,
    payload,
  };
};
export const myPrescriptionsClear = payload => {
  return {
    type: types.MY_PRESCRIPTIONS_CLEAR,
    payload,
  };
};