import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  patientsReqError,
  patientsReqSuccess,
} from '../../action/patients/patientsRequestAction';
import patientsRequestService from '../../../network/networkServices/patients/patientsRequestService';

export function* patientsRequestSaga(data) {
  try {
    let response = yield call(patientsRequestService.getPatientsRequest, data);
    yield put(patientsReqSuccess(response?.data));
  } catch (error) {
    yield put(patientsReqError(error));
  }
}

export function* watchPatientsRequestSaga() {
  yield takeLatest(types.PATIENT_REQ_REQUEST, patientsRequestSaga);
}
