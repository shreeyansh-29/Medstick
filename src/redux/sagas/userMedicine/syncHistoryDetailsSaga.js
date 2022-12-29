import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  syncHistoryDetailsError,
  syncHistoryDetailsSuccess,
} from '../../action/userMedicine/syncHistoryDetailsAction';
import * as types from '../../actionTypes';

export function* syncHistoryDetailsSaga(data) {
  try {
    const response = yield call(networkService.syncHistoryDetails, data);
    yield put(syncHistoryDetailsSuccess(response?.data));
  } catch (error) {
    yield put(syncHistoryDetailsError(error));
  }
}
export function* watchSyncHistoryDetailsSaga() {
  yield takeLatest(types.SYNC_HISTORY_DETAILS_REQUEST, syncHistoryDetailsSaga);
}
