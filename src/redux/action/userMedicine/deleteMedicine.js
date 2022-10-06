import * as types from '../../actionTypes';

export const deleteMedicineRequest = payload => {
  return {
    type: types.DELETE_MEDICINE_REQUEST,
    payload,
  };
};
export const deleteMedicineSuccess = payload => {
  return {
    type: types.DELETE_MEDICINE_SUCCESS,
    payload,
  };
};
export const deleteMedicineError = payload => {
  return {
    type: types.DELETE_MEDICINE_ERROR,
    payload,
  };
};
