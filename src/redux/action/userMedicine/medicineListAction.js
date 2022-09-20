import {medicineListConstant} from '../../constant/userMedicine/medicineListConstant';

const loadMedicineList = (id, token, userId) => ({
  type: medicineListConstant.medicineListLoad,
  payload: {
    id,
    token,
    userId,
  },
});
const successMedicineList = data => ({
  type: medicineListConstant.medicineListSuccess,
  payload: data,
});
const errorMedicineList = err => ({
  type: medicineListConstant.medicineListError,
  payload: err,
});

export {loadMedicineList, successMedicineList, errorMedicineList};
