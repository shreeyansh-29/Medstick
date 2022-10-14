import * as types from '../../actionTypes';

export const PrescriptionRequest = payload => ({
  type: types.SAVE_PRESCRIPTION_REQUEST,
  payload,
});
export const PrescriptionSuccess = data => ({
  type: types.SAVE_PRESCRIPTION_SUCCESS,
  data,
});
export const PrescriptionError = err => ({
  type: types.SAVE_PRESCRIPTION_ERROR,
  err
});
