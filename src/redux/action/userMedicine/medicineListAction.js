import * as types from '../../actionTypes';

export const medicineListRequest = payload => ({
  type: types.USER_MEDICINE_REQUEST,
  payload,
});
export const medicineListSuccess = data => ({
  type: types.USER_MEDICINE_SUCCESS,
  data,
});
export const medicineListError = err => ({
  type: types.USER_MEDICINE_ERROR,
  err
});
