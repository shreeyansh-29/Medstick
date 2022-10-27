import {call, put, takeLatest} from 'redux-saga/effects';
import saveAppointmentNetworkService from '../../../network/networkServices/user/saveAppointmentNetworkService';
import { saveAppointmentError, saveAppointmentSuccess } from '../../action/appointmentReminderAction/saveAppointmentAction';
import * as types from '../../actionTypes';

export function* saveAppointmentWorkerSaga(data) {
  try {
    const response = yield call(saveAppointmentNetworkService.saveAppointmentReminder,data);
    console.log(response,"response");
    yield put(saveAppointmentSuccess(response?.data));
  } catch (error) {
    yield put(saveAppointmentError(error));
  }
}
export function* saveAppointmentWatcherSaga() {
  yield takeLatest(types.SAVE_APPOINTMENT_REQUEST, saveAppointmentWorkerSaga);
}

