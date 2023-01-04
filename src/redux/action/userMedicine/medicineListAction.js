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

const clearMedicineList = () => {
  return {
    type: types.MEDICINE_LIST_CLEAR,
  };
};

export {
  loadMedicineList,
  successMedicineList,
  errorMedicineList,
  clearMedicineList,
};
