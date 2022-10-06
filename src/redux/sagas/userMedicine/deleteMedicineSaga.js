import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deleteMedicineError,
  deleteMedicineSuccess,
} from '../../action/userMedicine/deleteMedicine';
import DeleteMedicineNetworkService from '../../../network/networkServices/user/deleteMedicineNetworkService';

export function* deleteMedicineSaga(data) {
  try {
    let response = yield call(
      DeleteMedicineNetworkService.deleteMedicine,
      data,
    );
    yield put(deleteMedicineSuccess(response?.data));
  } catch (error) {
    yield put(deleteMedicineError(error));
  }
}

export function* watchDeleteMedicineSaga() {
  yield takeLatest(types.DELETE_MEDICINE_REQUEST, deleteMedicineSaga);
}
