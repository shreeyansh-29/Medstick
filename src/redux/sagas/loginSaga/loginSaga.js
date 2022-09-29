import {call, put, takeLatest} from 'redux-saga/effects';
import {loginError, loginSuccess} from '../../action/loginAction/loginAction';
import * as types from '../../actionTypes';
import loginNetworkService from '../../../network/networkServices/authNetworkServices/loginNetworkService';

export function* loginSaga(payload) {
  try {
    let response = yield call(loginNetworkService.login, payload);
    console.log("success")
    yield put(loginSuccess(response));
  } catch (error) {
    console.log("errpr")
    yield put(loginError(error));
  }
}

export function* watchLoginSaga() {
  console.log("reuest")
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}
