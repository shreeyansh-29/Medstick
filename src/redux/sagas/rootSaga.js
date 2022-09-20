import {all} from 'redux-saga/effects';
import {watchLoginSaga} from './loginSaga/loginSaga';
import {watchSignUpSaga} from './signUpSaga/signUpSaga';

export default function* RootSaga() {
  yield all([watchLoginSaga(), watchSignUpSaga()]);
}
