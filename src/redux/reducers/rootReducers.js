import {combineReducers} from 'redux';
import {medicineListReducer} from './userMedicine/medicineListReducer';

const rootReducer = combineReducers({
  medicineList: medicineListReducer,
});

export default rootReducer;
