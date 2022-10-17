import {all} from 'redux-saga/effects';
import {watchLoginSaga} from './loginSaga/loginSaga';
import {watchMyPatientsSaga} from './patients/myPatientsSaga';
import {watchSignUpSaga} from './signUpSaga/signUpSaga';
import {watchEditProfileSaga} from './profileSaga/editProfileSaga';
import {watchPatientsRequestSaga} from './patients/patientsRequestSaga';
import {watchAcceptPatientReqSaga} from './patients/acceptPatientReqSaga';
import {addMedicineWatcherSaga} from './userMedicine/addMedicineWatcherSaga';
import {getPrescriptionWatcherSaga} from './doctorPrescriptionSaga/getPrescriptionWatcherSaga';
import {saveDoctorPrescriptionWatcherSaga} from './doctorPrescriptionSaga/saveDoctorPrescriptionWatcherSaga';
import {saveUserMedicineWatcherSaga} from './userMedicine/saveUserMedicineWatcherSaga';
import {watchSendSnapSaga} from './otherScreenSaga/sendSnapSaga';
import {medicineListWatcherSaga} from './userMedicine/medicineListWatcherSaga';
import {watchDeleteMedicineSaga} from './userMedicine/deleteMedicineSaga';
import {appointmentReminderWatcherSaga} from './userMedicine/appointmentReminderWatcherSaga';
import {getAppointmentWatcherSaga} from './appointmentSaga/getAppointmentWatcherSaga';
import {watchMyPrescriptionsSaga} from './otherScreenSaga/myPrescriptionsSaga';
import {watchGetUserProfileSaga} from './profileSaga/getUserProfileSaga';
import {getAllNotificationWatcherSaga} from './notification/getAllNotificationWatcherSaga';
import {saveAppointmentWatcherSaga} from './appointmentSaga/saveAppointmentReminderWatcherSaga';
import {deleteNotificationWatcherSaga} from './notification/deleteNotificationWatcherSaga';
import {watchMyCaretakerSaga} from './caretaker/myCaretakerSaga';
import {watchCaretakerRequestSaga} from './caretaker/caretakerRequestSaga';
import {watchAcceptCaretakerReqSaga} from './caretaker/acceptCaretakerReqSaga';
import {watchDeleteCaretakerReqSaga} from './caretaker/deleteCaretakerReqSaga';
import {watchGetMedsSaga} from './patients/getMedsSaga';
import {watchGetUserSaga} from './getUserSaga/getUserSaga';
import {watchSendReqSaga} from './getUserSaga/sendReqSaga';
import {watchNotifyUserSaga} from './patients/notifyUserSaga';
import {watchMedicineImagesSaga} from './patients/medicineImagesSaga';
import {getUserMedicineWatcherSaga} from './userMedicine/getUserMedicineWatcherSaga';
import { searchMedicineWatcherSaga } from './userMedicine/searchMedicineWatcherSaga';

export default function* RootSaga() {
  yield all([
    watchLoginSaga(),
    watchSignUpSaga(),
    watchMyPatientsSaga(),
    watchEditProfileSaga(),
    watchPatientsRequestSaga(),
    watchAcceptPatientReqSaga(),
    addMedicineWatcherSaga(),
    getPrescriptionWatcherSaga(),
    saveDoctorPrescriptionWatcherSaga(),
    saveUserMedicineWatcherSaga(),
    watchSendSnapSaga(),
    medicineListWatcherSaga(),
    watchDeleteMedicineSaga(),
    appointmentReminderWatcherSaga(),
    getAppointmentWatcherSaga(),
    watchMyPrescriptionsSaga(),
    watchGetUserProfileSaga(),
    getAllNotificationWatcherSaga(),
    watchMyCaretakerSaga(),
    watchCaretakerRequestSaga(),
    watchAcceptCaretakerReqSaga(),
    watchDeleteCaretakerReqSaga(),
    saveAppointmentWatcherSaga(),
    medicineListWatcherSaga(),
    watchGetMedsSaga(),
    watchGetUserSaga(),
    watchSendReqSaga(),
    watchNotifyUserSaga(),
    watchMedicineImagesSaga(),
    deleteNotificationWatcherSaga(),
    getUserMedicineWatcherSaga(),
    saveUserMedicineWatcherSaga(),
    searchMedicineWatcherSaga(),
  ]);
}
