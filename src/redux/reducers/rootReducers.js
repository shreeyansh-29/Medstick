import {combineReducers} from 'redux';
import medicineListReducer from './userMedicine/medicineListReducer';

export const rootReducer = combineReducers({
    medicineList:medicineListReducer
});
