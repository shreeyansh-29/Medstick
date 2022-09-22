import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  myPatientsError,
  myPatientsSuccess,
} from '../../action/patients/myPatientsAction';
import myPatientsService from '../../../network/networkServices/patients/myPatientsService';

export function* myPatientsSaga(data) {
  try {
    let response = yield call(myPatientsService.getMyPatients, data);
    yield put(myPatientsSuccess(response?.data));
  } catch (error) {
    yield put(myPatientsError(error));
  }
}

export function* watchMyPatientsSaga() {
  yield takeLatest(types.MY_PATIENTS_REQUEST, myPatientsSaga);
}
