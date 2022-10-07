import {call, put, takeLatest} from 'redux-saga/effects';
import {
  signUpError,
  signUpSuccess,
} from '../../action/signUpAction/signUpAction.js';
import * as types from '../../actionTypes';
import signUpNetworkService from '../../../network/networkServices/authNetworkServices/signUpNetworkService';

export function* signUpSaga(data) {
  try {
    let response = yield call(signUpNetworkService.signUp, data);
    yield put(signUpSuccess(response));
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* watchSignUpSaga() {
  yield takeLatest(types.SIGN_UP_REQUEST, signUpSaga);
}
