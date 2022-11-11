import {call, put, takeLatest} from 'redux-saga/effects';
import UserMedicineNetworkService from '../../../network/networkServices/user/userMedicineNetworkServices';
import {
  errorGetUserMedicine,
  successGetUserMedicine,
} from '../../action/userMedicine/getUserMedicineAction';
import {getUserMedicine} from '../../constant/userMedicine/getUserMedicineConstant';

export function* getUserMedicineWorkerSaga(data) {
  const {payload} = data;
  try {
    const response = yield call(
      UserMedicineNetworkService.getUserMedicine,
      payload,
    );
    yield put(successGetUserMedicine(response?.data));
  } catch (err) {
    yield put(errorGetUserMedicine(err));
  }
}

export function* getUserMedicineWatcherSaga() {
  yield takeLatest(
    getUserMedicine.getUserMedicineLoad,
    getUserMedicineWorkerSaga,
  );
}
