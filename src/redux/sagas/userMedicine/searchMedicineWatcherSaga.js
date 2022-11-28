import {call, put, takeLatest} from 'redux-saga/effects';
import searchMedicineNetworkService from '../../../network/networkServices/user/searchMedicineNetworkService';
import {
  searchMedicineError,
  searchMedicineSuccess,
} from '../../action/userMedicine/searchMedicineAction';
import * as types from '../../actionTypes';

export function* searchMedicineWorkerSaga(data) {
  try {
    const response = yield call(
      searchMedicineNetworkService.searchMedicineRequest,
      data,
    );
    yield put(searchMedicineSuccess(response?.data));
  } catch (err) {
    yield put(searchMedicineError(err.response));
  }
}

export function* searchMedicineWatcherSaga() {
  yield takeLatest(types.SEARCH_MEDICINE_REQUEST, searchMedicineWorkerSaga);
}
