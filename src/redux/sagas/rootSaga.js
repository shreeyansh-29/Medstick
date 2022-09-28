import {all} from 'redux-saga/effects';
import {watchLoginSaga} from './loginSaga/loginSaga';
import {watchMyPatientsSaga} from './patients/myPatientsSaga';
import {watchSignUpSaga} from './signUpSaga/signUpSaga';
import {watchEditProfileSaga} from './editProfileSaga/editProfileSaga';
import {watchPatientsRequestSaga} from './patients/patientsRequestSaga';
import {watchAcceptPatientReqSaga} from './patients/acceptPatientReqSaga';
import {watchSendSnapSaga} from './otherScreenSaga/sendSnapSaga';

export default function* RootSaga() {
  yield all([
    watchLoginSaga(),
    watchSignUpSaga(),
    watchMyPatientsSaga(),
    watchEditProfileSaga(),
    watchPatientsRequestSaga(),
    watchAcceptPatientReqSaga(),
    watchSendSnapSaga(),
  ]);
}