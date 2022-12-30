import * as types from '../../actionTypes';

export const getAllMedicineHistoryRequest = payload => {
  return {
    type: types.GET_ALL_MED_HISTORY_REQUEST,
    payload,
  };
};
export const getAllMedicineHistorySuccess = payload => {
  return {
    type: types.GET_ALL_MED_HISTORY_SUCCESS,
    payload,
  };
};
export const getAllMedicineHistoryError = payload => {
  return {
    type: types.GET_ALL_MED_HISTORY_ERROR,
    payload,
  };
};
export const getAllMedicineHistoryClear = () => {
  return {
    type: types.GET_ALL_MED_HISTORY_CLEAR,
  };
};
