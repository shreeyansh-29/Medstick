import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  syncDataError,
  syncDataSuccess,
} from '../../action/userMedicine/syncDataAction';
import * as types from '../../actionTypes';

export function* syncDataSaga(data) {
  try {
    const response = yield call(networkService.syncData, data);
    yield put(syncDataSuccess(response?.data));
  } catch (error) {
    yield put(syncDataError(error));
  }
}
export function* watchSyncDataSaga() {
  yield takeLatest(types.SYNC_DATA_REQUEST, syncDataSaga);
}
