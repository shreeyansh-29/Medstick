import { call, put, takeLatest } from "redux-saga/effects";
import userMedicineNetworkServices from "../../../network/networkServices/user/userMedicineNetworkServices";
import {addMedicineConstant} from '../../constant/userMedicine/addMedicine'
import {errorAddMedicine, successAddMedicine,} from '../../action/userMedicine/addMedicineAction'
export function* addMedicineWorkerSaga(data){
    const {payload}=data;
    try{
        const response=yield call(userMedicineNetworkServices.postSaveMedicine,payload)
yield put(successAddMedicine(response?.data))
    }
    catch(error)
    {
        yield put(errorAddMedicine(error))
    }
}


export function* addMedicineWatcherSaga(){
    yield takeLatest( addMedicineConstant.addMedicineLoad,addMedicineWorkerSaga,)
    
}