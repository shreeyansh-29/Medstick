import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  medicineNotesError,
  medicineNotesSuccess,
} from '../../action/medicineNotes/medicineNotesAction';
import medicineNotesNetworkServices from '../../../network/networkServices/user/medicineNotesNetworkServices';

export function* MedicineNotesWorkerSaga(payload) {
  try {
    let response = yield call(
      medicineNotesNetworkServices.MedicineNotes,
      payload,
    );
    yield put(medicineNotesSuccess(response.data));
  } catch (error) {
    yield put(medicineNotesError(error));
  }
}

export function* MedicineNotesWatcherSaga() {
  yield takeLatest(types.MEDICINE_NOTES_REQUEST, MedicineNotesWorkerSaga);
}
