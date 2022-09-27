import {combineReducers} from 'redux';
import {myCaretakerReducer} from './caretakerReducer/caretakerReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import {medicineListReducer} from './userMedicine/medicineListReducer';
import { caretakerListReducer } from './caretakerReducer/caretakerListReducer';

const rootReducer = combineReducers({
  medicineList: medicineListReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  careTaker: myCaretakerReducer,
  listCaretaker: caretakerListReducer, 
});

export default rootReducer;
