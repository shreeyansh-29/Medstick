import * as types from '../../actionTypes';

export const getAppointmentRequest = payload => {
  return {
    type: types.GET_APPOINTMENT_REQUEST,
    payload: payload
  };
};
export const getAppointmentSuccess = data => {
  return {
    type: types.GET_APPOINTMENT_SUCCESS,
    payload: data,
  };
};
export const getAppointmentError = err => {
  return {
    type: types.GET_APPOINTMENT_ERROR,
    payload: err,
  };
};
