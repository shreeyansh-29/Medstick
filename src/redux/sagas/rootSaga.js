import {all} from 'redux-saga/effects';
import {watchLoginSaga} from './loginSaga/loginSaga';
import {watchMyPatientsSaga} from './patients/myPatientsSaga';
import {watchSignUpSaga} from './signUpSaga/signUpSaga';
import {watchEditProfileSaga} from './editProfileSaga/editProfileSaga';
import {watchPatientsRequestSaga} from './patients/patientsRequestSaga';
import {watchAcceptPatientReqSaga} from './patients/acceptPatientReqSaga';
import {watchSendSnapSaga} from './otherScreenSaga/sendSnapSaga';
import {watchMyCaretakerSaga} from './caretakerSaga/myCaretakerSaga';
import {watchMyCaretakerRequestSaga} from './caretakerSaga/caretakerRequestSaga';
import {medicineListWatcherSaga} from './userMedicine/medicineListWatcherSaga';
import {watchDeleteMedicineSaga} from './userMedicine/deleteMedicineSaga';
import {appointmentReminderWatcherSaga} from './userMedicine/appointmentReminderWatcherSaga';
import { getAppointmentWatcherSaga } from './appointmentSaga/getAppointmentWatcherSaga';

export default function* RootSaga() {
  yield all([
    watchLoginSaga(),
    watchSignUpSaga(),
    watchMyPatientsSaga(),
    watchEditProfileSaga(),
    watchMyCaretakerSaga(),
    watchMyCaretakerRequestSaga(),
    watchPatientsRequestSaga(),
    watchAcceptPatientReqSaga(),
    watchSendSnapSaga(),
    medicineListWatcherSaga(),
    watchDeleteMedicineSaga(),
    appointmentReminderWatcherSaga(),
    getAppointmentWatcherSaga(),
  ]);
}
