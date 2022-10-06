import * as types from '../../actionTypes';

export const UserMedicineByIdRequest = payload => ({
  type: types.USER_MEDICINE_BY_ID_REQUEST,
  payload,
});
export const UserMedicineByIdSuccess = data => ({
  type: types.USER_MEDICINE_BY_ID_SUCCESS,
  data,
});
export const UserMedicineByIdError = err => ({
  type: types.USER_MEDICINE_BY_ID_ERROR,
  err,
});
