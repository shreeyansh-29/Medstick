import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deleteAppointmentError,
  deleteAppointmentSuccess,
} from '../../action/appointmentReminderAction/deleteAppointmentAction';
import deleteAppointmentNetworkService from '../../../network/networkServices/user/deleteAppointmentNetworkService';

export function* deleteAppointmentWorkerSaga(data) {
  try {
    let response = yield call(deleteAppointmentNetworkService.deleteAppointment,data);
    yield put(deleteAppointmentSuccess(response?.data));
  } catch (error) {
    yield put(deleteAppointmentError(error));
  }
}

export function* deleteAppointmentWatcherSaga() {
  yield takeLatest(types.DELETE_APPOINTMENT_REQUEST, deleteAppointmentWorkerSaga);
}
