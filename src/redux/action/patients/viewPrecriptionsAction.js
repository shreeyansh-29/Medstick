import * as types from '../../actionTypes';

export const viewPrescriptionsRequest = payload => {
  return {
    type: types.USER_PRESCRIPTIONS_REQUEST,
    payload,
  };
};
export const viewPrescriptionsSuccess = payload => {
  return {
    type: types.USER_PRESCRIPTIONS_SUCCESS,
    payload,
  };
};
export const viewPrescriptionsError = payload => {
  return {
    type: types.USER_PRESCRIPTIONS_ERROR,
    payload,
  };
};
