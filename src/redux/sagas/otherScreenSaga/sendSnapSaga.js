import {call, put, takeLatest} from 'redux-saga/effects';
import {
  sendSnapError,
  sendSnapSuccess,
} from '../../action/otherScreenAction/sendSnapAction';
import * as types from '../../actionTypes';
import sendSnapService from '../../../network/networkServices/otherServices/sendSnapService';

export function* sendSnapSaga(data) {
  try {
    let response = yield call(sendSnapService.sendSnap, data);
    console.log(response);
    yield put(sendSnapSuccess(response));
  } catch (error) {
    yield put(sendSnapError(error));
  }
}

export function* watchSendSnapSaga() {
  yield takeLatest(types.SEND_SNAP_REQUEST, sendSnapSaga);
}
