import {combineReducers} from 'redux';
import {myCaretakerReducer} from '../../redux/reducers/caretakerReducer/myCaretakerReducer'
import {editProfileReducer} from './profileReducer/editProfileReducer';
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
import {myPrescriptionsReducer} from './otherScreenReducer/myPrescriptionsReducer';
import {getUserProfileReducer} from './profileReducer/getUserProfileReducer';
import { updateAppointmentReducer } from './appointmentReminderReducer/updateAppointmentReducer';
import { deleteAppointmentReducer } from './appointmentReminderReducer/deleteAppointmentReducer';

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
  myPrescriptions: myPrescriptionsReducer,
  getUserProfile: getUserProfileReducer,
  updateAppointment: updateAppointmentReducer,
  deleteAppointment: deleteAppointmentReducer,
});

export default rootReducer;
