import {combineReducers} from 'redux';
import {editProfileReducer} from './profileReducer/editProfileReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {acceptPatientReqReducer} from './patients/acceptPatientReqReducer';
import {deletePatientReqReducer} from './patients/deletePatientReqReducer';
import {myPatientsReducer} from './patients/myPatientsReducer';
import {patientsRequestReducer} from './patients/patientsRequestReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import {sendSnapReducer} from './otherScreenReducer/sendSnapReducer';
// import medicineListReducer from './userMedicine/medicineListReducer';
import addMedicineReducer from './userMedicine/addMedicineReducer';
import getPrescriptionReducer from './doctorPrescription/getPrescriptionReducer';
import { saveDoctorPrescriptionReducer } from './doctorPrescription/saveDoctorPrescriptionReducer';
import saveUserMedicineReducer from './userMedicine/saveUserMedicineReducer';
import {deleteMedicineReducer} from './userMedicine/deleteMedicineReducer';
import {appointmentReminderReducer} from './userMedicine/appointmentReminderReducer';
import {saveAppointmentReminderReducer} from './appointmentReminderReducer/saveAppointmentReminderReducer';
import {getAppointmentReducer} from './appointmentReminderReducer/getAppointmentReducer';
import {myPrescriptionsReducer} from './otherScreenReducer/myPrescriptionsReducer';
import {getUserProfileReducer} from './profileReducer/getUserProfileReducer';
import getAllNotificationReducer from './notification/getAllNotificationReducer';
import deleteNotificationReducer from './notification/deleteNotificationReducer';
import {myCaretakerReducer} from './caretaker/myCaretakerReducer';
import {caretakerRequestReducer} from './caretaker/caretakerRequestReducer';
import {acceptCaretakerReqReducer} from './caretaker/acceptCaretakerReqReducer';
import {deleteCaretakerReqReducer} from './caretaker/deleteCaretakerReqReducer';
import { getMedicineHistoryReducer } from './userMedicine/getMedicineHistoryReducer';
import {userMedicineByIdReducer} from './userMedicine/userMedicineByIdReducer'
import { getUserMedicineReducer } from './userMedicine/getUserMedicineReducer';
const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  careTaker: myCaretakerReducer,
  listCaretaker: caretakerRequestReducer,
  myPatients: myPatientsReducer,
  patientsRequest: patientsRequestReducer,
  acceptPatientRequest: acceptPatientReqReducer,
  deletePatientRequest: deletePatientReqReducer,
  editProfile: editProfileReducer,
  addMedicineReducer:addMedicineReducer,
  getPrescriptionReducer:getPrescriptionReducer,
  saveDoctorPrescriptionReducer:saveDoctorPrescriptionReducer,
  saveUserMedicineReducer:saveUserMedicineReducer,
  sendSnap: sendSnapReducer,
  deleteMedicine: deleteMedicineReducer,
  appointmentReminder: appointmentReminderReducer,
  saveAppointment: saveAppointmentReminderReducer,
  getAppointment: getAppointmentReducer,
  myPrescriptions: myPrescriptionsReducer,
  getUserProfile: getUserProfileReducer,
  getAllNotificationReducer:getAllNotificationReducer,
  deleteNotificationReducer:deleteNotificationReducer,
  myCaretaker: myCaretakerReducer,
  caretakerRequest: caretakerRequestReducer,
  acceptCaretakerRequest: acceptCaretakerReqReducer,
  deleteCaretakerRequest: deleteCaretakerReqReducer,
  getMedicineHistoryReducer:getMedicineHistoryReducer,
  userMedicineByIdReducer:userMedicineByIdReducer,
  getUserMedicineReducer:getUserMedicineReducer,
});

export default rootReducer;
