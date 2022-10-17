import {call, put, takeLatest} from 'redux-saga/effects';
import searchMedicineNetworkService from '../../../network/networkServices/user/searchMedicineNetworkService';
import { searchMedicineError, searchMedicineSuccess } from '../../action/userMedicine/searchMedicineAction';
import * as types from '../../actionTypes'

export function* searchMedicineWorkerSaga(data) {
  const {payload} = data;
  try {
    const response = yield call(searchMedicineNetworkService.searchMedicineRequest,payload);
    console.log(response,"repsonse");
    yield put(searchMedicineSuccess(response?.data));
  } catch (err) {
    yield put(searchMedicineError(err));
  }
}

export function* searchMedicineWatcherSaga() {
  yield takeLatest(
    types.SEARCH_MEDICINE_REQUEST,
    searchMedicineWorkerSaga,
  );
}
