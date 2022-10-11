import {call, put, takeLatest} from 'redux-saga/effects';
import getAppointmentNetworkService from '../../../network/networkServices/user/getAppointmentNetworkService';
import { getAppointmentError, getAppointmentSuccess } from '../../action/appointmentReminderAction/getAppointmentAction';

import * as types from '../../actionTypes';

export function* getAppointmentWorkerSaga(data) {
  try {
    let response = yield call(getAppointmentNetworkService.getAppointmentRequest, data);
    console.log(response,"response for get");
    yield put(getAppointmentSuccess(response));
  } catch (error) {
    yield put(getAppointmentError(error));
  }
}

export function* getAppointmentWatcherSaga() {
  yield takeLatest(types.GET_APPOINTMENT_REQUEST, getAppointmentWorkerSaga);
}

