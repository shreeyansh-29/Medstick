import { call, put, takeLatest } from "redux-saga/effects";
import getMedicineHistoryNetworkServices from "../../../network/networkServices/user/getMedicineHistoryNetworkServices";
import { errorGetMedicineHistoryByDate, successGetMedicineHistoryByDate } from "../../action/userMedicine/getMedicineHistoryByDateAction";
import { getMedicineHistoryByDate } from "../../constant/userMedicine/getMedicineHistoryByDateConstant";

export function* getMedicineHistoryByDateWorkerSaga(data){
    const {payload}=data
    console.log(data,"data")
    try{
     const response=yield call(getMedicineHistoryNetworkServices.getMedicineHistoryByDate,payload)
     yield put(successGetMedicineHistoryByDate(response?.data))
    }
    catch(error){
    yield put(errorGetMedicineHistoryByDate(error))
    }
}

export function* getMedicineHistoryByDateWatcherSaga(){
yield takeLatest(getMedicineHistoryByDate.getMedicineHistoryByDateLoad,getMedicineHistoryByDateWorkerSaga)
}