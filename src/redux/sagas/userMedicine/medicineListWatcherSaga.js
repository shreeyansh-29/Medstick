import {put, takeLatest} from 'redux-saga/effects';
import userMedicineNetworkServices from '../../../network/networkServices/user/userMedicineNetworkServices';
import {
  medicineListSuccess,
  medicineListError,
} from '../../action/userMedicine/medicineListAction';
import { USER_MEDICINE_REQUEST } from '../../actionTypes';

export function* medicineListWorkerSaga(data) {
  try {
    const response = yield call(
      userMedicineNetworkServices.getUserMedicine,
      data,
    );
    yield put(medicineListSuccess(response?.data));
  } catch (error) {
    yield put(medicineListError(error));
  }
}
export function* medicineListWatcherSaga() {
  yield takeLatest(
    USER_MEDICINE_REQUEST,
    medicineListWorkerSaga,
  );
}
