import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deletePatientReqError,
  deletePatientReqSuccess,
} from '../../action/patients/deletePatientReqAction';
import deletePatientReqService from '../../../network/networkServices/common/deleteRequestService';

export function* deletePatientRequestSaga(data) {
  try {
    let response = yield call(deletePatientReqService.putDeleteRequest, data);
    yield put(deletePatientReqSuccess(response));
  } catch (error) {
    yield put(deletePatientReqError(error));
  }
}

export function* watchDeletePatientReqSaga() {
  yield takeLatest(
    types.DELETE_CARETAKER_REQ_REQUEST,
    deletePatientRequestSaga,
  );
}
