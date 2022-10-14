import { call, put, takeLatest } from "redux-saga/effects";
import userMedicineNetworkServices from "../../../network/networkServices/user/userMedicineNetworkServices";
import { errorSaveUserMedicine, successSaveUserMedicine } from "../../action/userMedicine/saveUserMedicineAction";
import { saveUserMedicine } from "../../constant/userMedicine/saveUserMedicineConstant";

export function* saveUserMedicineWorkerSaga(data){
    const {payload}=data
    try{
        const response=yield call(userMedicineNetworkServices.postSaveUserMedicine,payload)
        console.log(response,"response")
        yield put(successSaveUserMedicine(response?.data))
    }
    catch(error)
    {
        yield put(errorSaveUserMedicine(error))
    }
}

export function* saveUserMedicineWatcherSaga(){
    yield takeLatest(saveUserMedicine.saveUserMedicineLoad,saveUserMedicineWorkerSaga)
}