import { call, put, takeLatest } from "redux-saga/effects";
import saveDoctorPrescriptionNetworkService from "../../../network/networkServices/doctorPrescription/saveDoctorPrescriptionNetworkService";
import { errorSaveDoctorPrescription, successSaveDoctorPrescription } from "../../action/doctorPrescription/saveDoctorPrescriptionAction";
import { saveDoctorPrescription } from "../../constant/doctorPrescription/saveDoctorPrescription";

export function* saveDoctorPrescriptionWorkerSaga(data) {
    const { payload } = data
    try {
        const response = yield call(saveDoctorPrescriptionNetworkService.saveDoctorPrescription, payload)
        console.log(response,"res")
        yield put(successSaveDoctorPrescription(response?.data))
    }
    catch (error) {
        yield put(errorSaveDoctorPrescription(error))
    }
}

export function* saveDoctorPrescriptionWatcherSaga() {
    yield takeLatest(saveDoctorPrescription.saveDoctorPrescriptionLoad, saveDoctorPrescriptionWorkerSaga)
}