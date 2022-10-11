import {combineReducers} from 'redux';
import {myCaretakerReducer} from './caretakerReducer/myCaretakerReducer';
import {editProfileReducer} from './editProfileReducer/editProfileReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {acceptPatientReqReducer} from './patients/acceptPatientReqReducer';
import {deletePatientReqReducer} from './patients/deletePatientReqReducer';
import {myPatientsReducer} from './patients/myPatientsReducer';
import {patientsRequestReducer} from './patients/patientsRequestReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import {sendSnapReducer} from './otherScreenReducer/sendSnapReducer';
import { caretakerRequestReducer } from './caretakerReducer/caretakerRequestReducer';
import {deleteMedicineReducer} from './userMedicine/deleteMedicineReducer';
import { appointmentReminderReducer } from './userMedicine/appointmentReminderReducer';
import { saveAppointmentReminderReducer } from './appointmentReminderReducer/saveAppointmentReminderReducer';
import { getAppointmentReducer } from './appointmentReminderReducer/getAppointmentReducer';

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
  sendSnap: sendSnapReducer,
  deleteMedicine: deleteMedicineReducer,
  appointmentReminder: appointmentReminderReducer,
  saveAppointment: saveAppointmentReminderReducer,
  getAppointment: getAppointmentReducer,
});

export default rootReducer;
