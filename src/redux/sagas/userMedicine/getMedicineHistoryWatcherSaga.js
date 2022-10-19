import { call, put, takeLatest } from "redux-saga/effects";
import getMedicineHistoryNetworkServices from "../../../network/networkServices/user/getMedicineHistoryNetworkServices";
import { errorGetMedicineHistory, successGetMedicineHistory } from "../../action/userMedicine/getMedicineHistoryAction";
import { getMedicineHistory } from "../../constant/userMedicine/getMedicineHistory";

export function* getMedicineHistoryWorkerSaga(data){
    const {payload}=data
   try{
   const response=yield call(getMedicineHistoryNetworkServices.getMedicineHistory,payload)
   console.log(response,"response")
   yield put(successGetMedicineHistory(response?.data))
   }
   catch(error){
   yield put(errorGetMedicineHistory(error))
   }
}

export function* getMedicineHistoryWatcherSaga(){
    yield takeLatest(getMedicineHistory.getMedicineHistoryLoad,getMedicineHistoryWorkerSaga)
}