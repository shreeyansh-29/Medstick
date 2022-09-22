import {combineReducers} from 'redux';
import { editProfileReducer } from './editProfileReducer/editProfileReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {acceptPatientReqReducer} from './patients/acceptPatientReqReducer';
import {deletePatientReqReducer} from './patients/deletePatientReqReducer';
import {myPatientsReducer} from './patients/myPatientsReducer';
import {patientsRequestReducer} from './patients/patientsRequestReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import medicineListReducer from './userMedicine/medicineListReducer';

const rootReducer = combineReducers({
  medicineList: medicineListReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  myPatients: myPatientsReducer,
  patientsRequest: patientsRequestReducer,
  acceptPatientRequest: acceptPatientReqReducer,
  deletePatientRequest: deletePatientReqReducer,
  editProfile: editProfileReducer,
});

export default rootReducer;
