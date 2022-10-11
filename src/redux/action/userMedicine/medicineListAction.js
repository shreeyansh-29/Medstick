import * as types from '../../actionTypes';

const loadMedicineList = () => {
  return {
    type: types.MEDICINE_LIST_REQUEST,
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

export {loadMedicineList, successMedicineList, errorMedicineList};

