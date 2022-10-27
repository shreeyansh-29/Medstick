import {call, put, takeLatest} from 'redux-saga/effects';
import updateAppointmentNetworkService from '../../../network/networkServices/user/updateAppointmentNetworkService';
import { updateAppointmentError, updateAppointmentSuccess } from '../../action/appointmentReminderAction/updateAppointmentAction';
import * as types from '../../actionTypes';

export function* updateAppointmentWorkerSaga(data) {
  try {
    const response = yield call(updateAppointmentNetworkService.updateAppointment,data);
    console.log(response,"response");
    yield put(updateAppointmentSuccess(response?.data));
  } catch (error) {
    console.log(error);
    yield put(updateAppointmentError(error));
  }
}

export function* updateAppointmentWatcherSaga() {
  yield takeLatest(types.UPDATE_APPOINTMENT_REQUEST, updateAppointmentWorkerSaga);
}

