import {put, takeLatest} from 'redux-saga/effects';
import userMedicineNetworkServices from '../../../network/networkServices/user/userMedicineNetworkServices';
import {PrescriptionSuccess, PrescriptionError} from '../../action/userMedicine/saveDoctorPrescriptionAction';
import { SAVE_PRESCRIPTION_REQUEST } from '../../actionTypes';

export function* saveDoctorPrescriptionWorkerSaga(data) {
  try {
    const response = yield call(
      userMedicineNetworkServices.getUserMedicine,
      data,
    );
    yield put(PrescriptionSuccess(response?.data));
  } catch (error) {
    yield put(PrescriptionError(error));
  }
}
export function* saveDoctorPrescriptionWatcherSaga() {
  yield takeLatest(
    SAVE_PRESCRIPTION_REQUEST,
    saveDoctorPrescriptionWorkerSaga,
  );
}

