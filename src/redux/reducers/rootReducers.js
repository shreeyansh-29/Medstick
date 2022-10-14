import {combineReducers} from 'redux';
import {editProfileReducer} from './profileReducer/editProfileReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {acceptPatientReqReducer} from './patients/acceptPatientReqReducer';
import {deletePatientReqReducer} from './patients/deletePatientReqReducer';
import {myPatientsReducer} from './patients/myPatientsReducer';
import {patientsRequestReducer} from './patients/patientsRequestReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import {sendSnapReducer} from './otherScreenReducer/sendSnapReducer';
import {deleteMedicineReducer} from './userMedicine/deleteMedicineReducer';
import {appointmentReminderReducer} from './userMedicine/appointmentReminderReducer';
import {saveAppointmentReminderReducer} from './appointmentReminderReducer/saveAppointmentReminderReducer';
import {getAppointmentReducer} from './appointmentReminderReducer/getAppointmentReducer';
import {myPrescriptionsReducer} from './otherScreenReducer/myPrescriptionsReducer';
import {getUserProfileReducer} from './profileReducer/getUserProfileReducer';
import {myCaretakerReducer} from './caretaker/myCaretakerReducer';
import {caretakerRequestReducer} from './caretaker/caretakerRequestReducer';
import {acceptCaretakerReqReducer} from './caretaker/acceptCaretakerReqReducer';
import {deleteCaretakerReqReducer} from './caretaker/deleteCaretakerReqReducer';
import {medicineListReducer} from './userMedicine/medicineListReducer';
import {getMedsReducer} from './patients/getMedsReducer';
import {sendRequestReducer} from './getUserReducer/sendReqReducer';
import {getUserReducer} from './getUserReducer/getUserReducer';
import {notifyUserReducer} from './patients/notifyUserReducer';
import {medicineImagesReducer} from './patients/medicineImagesReducer';
import {fetchImageReducer} from './patients/fetchImageReducer';

const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  medicineList: medicineListReducer,
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
  myCaretaker: myCaretakerReducer,
  caretakerRequest: caretakerRequestReducer,
  acceptCaretakerRequest: acceptCaretakerReqReducer,
  deleteCaretakerRequest: deleteCaretakerReqReducer,
  getMedicines: getMedsReducer,
  getUser: getUserReducer,
  sendRequest: sendRequestReducer,
  notifyUser: notifyUserReducer,
  medicineImages: medicineImagesReducer,
  fetchImage: fetchImageReducer,
});

export default rootReducer;
