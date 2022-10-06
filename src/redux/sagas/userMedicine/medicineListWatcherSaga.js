import {call, put, takeLatest} from 'redux-saga/effects';
import userMedicineNetworkServices from '../../../network/networkServices/user/userMedicineNetworkServices';
import {
  errorMedicineList,
  successMedicineList,
} from '../../action/userMedicine/medicineListAction';
import {medicineListConstant} from '../../constant/userMedicine/medicineListConstant';

export function* medicineListWorkerSaga() {
  try {
    const response = yield call(userMedicineNetworkServices.getUserMedicine);
    yield put(successMedicineList(response?.data));
  } catch (error) {
    yield put(errorMedicineList(error));
  }
}
export function* medicineListWatcherSaga() {
  yield takeLatest(
    medicineListConstant.medicineListLoad,
    medicineListWorkerSaga,
  );
}
