import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  acceptPatientReqError,
  acceptPatientReqSuccess,
} from '../../action/patients/acceptPatientReqAction';
import acceptPatientReqService from '../../../network/networkServices/patients/acceptPatientReqService';

export function* patientsRequestSaga(data) {
  try {
    let response = yield call(acceptPatientReqService.putAcceptRequest, data);
    yield put(acceptPatientReqSuccess(response));
  } catch (error) {
    yield put(acceptPatientReqError(error));
  }
}

export function* watchAcceptPatientReqSaga() {
  yield takeLatest(types.ACCEPT_PATIENT_REQ_REQUEST, patientsRequestSaga);
}
