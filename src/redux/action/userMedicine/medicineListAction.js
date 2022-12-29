import * as types from '../../actionTypes';

const loadMedicineList = payload => {
  return {
    type: types.MEDICINE_LIST_REQUEST,
    payload,
  };
};
const successMedicineList = payload => {
  return {
    type: types.MEDICINE_LIST_SUCCESS,
    payload,
  };
};
const errorMedicineList = payload => {
  return {
    type: types.MEDICINE_LIST_ERROR,
    payload,
  };
};

const clearMedicineList = payload => {
  return {
    type: types.MEDICINE_LIST_ERROR,
    payload,
  };
};

export {
  loadMedicineList,
  successMedicineList,
  errorMedicineList,
  clearMedicineList,
};
