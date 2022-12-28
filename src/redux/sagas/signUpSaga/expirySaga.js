import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService.js';
import {
  expiryError,
  expirySuccess,
} from '../../action/signUpAction/expiryActions';

export function* expirySaga() {
  try {
    let response = yield call(networkService.expiry);
    yield put(expirySuccess(response?.data));
  } catch (error) {
    yield put(expiryError(error.response));
  }
}

export function* watchExpirySaga() {
  yield takeLatest(types.EXPIRY_REQUEST, expirySaga);
}
