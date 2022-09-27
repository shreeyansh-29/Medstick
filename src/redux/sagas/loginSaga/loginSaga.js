import {call, put, takeLatest} from 'redux-saga/effects';
import {loginError, loginSuccess} from '../../action/loginAction/loginAction';
import * as types from '../../actionTypes';
import loginNetworkService from '../../../network/networkServices/authNetworkServices/loginNetworkService';

export function* loginSaga(data) {
  try {
    let response = yield call(loginNetworkService.login, data);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}
