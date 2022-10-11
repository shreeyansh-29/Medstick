import {call, put, takeLatest} from 'redux-saga/effects';
import appointmentReminderNetworkService from '../../../network/networkServices/user/appointmentReminderNetworkService';
import { appointmentReminderError, appointmentReminderSuccess } from '../../action/userMedicine/appointmentReminderAction';
import * as types from '../../actionTypes';

export function* appointmentReminderWorkerSaga(data) {
  try {
    console.log("data",data);
    const response = yield call(appointmentReminderNetworkService.appointmentReminder,data);
    console.log(response,"response");
    yield put(appointmentReminderSuccess(response?.data));
  } catch (error) {
    yield put(appointmentReminderError(error));
  }
}
export function* appointmentReminderWatcherSaga() {
  yield takeLatest(types.APPOINTMENT_REMINDER_REQUEST, appointmentReminderWorkerSaga);
}

