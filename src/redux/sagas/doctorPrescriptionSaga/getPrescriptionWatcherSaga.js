import { call, put, takeLatest } from "redux-saga/effects";
import getPrescriptionNetworkServices from "../../../network/networkServices/doctorPrescription/getPrescriptionNetworkServices";
import { errorGetPrescription, successGetPrescription } from "../../action/doctorPrescription/getPrescriptionAction";
import { getPrescription } from "../../constant/doctorPrescription/getPrescription";

 export function* getPrescriptionWorkerSaga(data)
 {
    const {payload}=data
console.log(payload,"payload")
    try
    {
       
        const response=yield call(getPrescriptionNetworkServices.getPrescription,payload)
        yield put(successGetPrescription(response?.data))
    }
    catch(error)
    {
        yield put(errorGetPrescription(error))
    }
 } 

 export function* getPrescriptionWatcherSaga()
 {
    yield takeLatest(getPrescription.getPrescriptionLoad,getPrescriptionWorkerSaga)
 }