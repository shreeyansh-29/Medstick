import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  getAppointmentListError,
  getAppointmentListSuccess,
} from '../../action/userMedicine/getAppointmentListAction';
import * as types from '../../actionTypes';

export function* getAppointmentListSaga() {
  try {
    const response = yield call(networkService.getDoctorAppointment);
    yield put(getAppointmentListSuccess(response?.data));
  } catch (error) {
    yield put(getAppointmentListError(error));
  }
}
export function* watchGetAppointmentListSaga() {
  yield takeLatest(types.GET_APPOINTMENT_REQUEST, getAppointmentListSaga);
}
