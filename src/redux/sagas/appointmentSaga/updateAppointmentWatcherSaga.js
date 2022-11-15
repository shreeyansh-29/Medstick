import {call, put, takeLatest} from 'redux-saga/effects';
import {
  updateAppointmentError,
  updateAppointmentSuccess,
} from '../../action/appointmentReminderAction/updateAppointmentAction';
import * as types from '../../actionTypes';
import UpdateAppointmentNetworkService from '../../../network/networkServices/user/updateAppointmentNetworkService';

export function* updateAppointmentSaga(data) {
  try {
    let response = yield call(
      UpdateAppointmentNetworkService.updateAppointment,
      data,
    );
    yield put(updateAppointmentSuccess(response?.data));
  } catch (error) {
    yield put(updateAppointmentError(error));
  }
}

export function* watchUpdateAppointmentSaga() {
  yield takeLatest(types.UPDATE_APPOINTMENT_REQUEST, updateAppointmentSaga);
}
