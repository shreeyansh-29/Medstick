import {medicineListConstant} from '../../constant/userMedicine/medicineListConstant';

const loadMedicineList = () => {
  return {
    type: medicineListConstant.medicineListLoad,
  };
};
const successMedicineList = payload => {
  return {
    type: medicineListConstant.medicineListSuccess,
    payload,
  };
};
const errorMedicineList = payload => {
  return {
    type: medicineListConstant.medicineListError,
    payload,
  };
};

export {loadMedicineList, successMedicineList, errorMedicineList};
