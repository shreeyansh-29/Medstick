import {combineReducers} from 'redux';
import {signInReducer} from './loginReducer/loginReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import medicineListReducer from './userMedicine/medicineListReducer';

const rootReducer = combineReducers({
  medicineList: medicineListReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
});

export default rootReducer;
