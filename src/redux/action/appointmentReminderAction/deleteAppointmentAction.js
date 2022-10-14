import * as types from '../../actionTypes';

export const deleteAppointmentRequest = payload => {
  return {
    type: types.DELETE_APPOINTMENT_REQUEST,
    payload: payload
  };
};
export const deleteAppointmentSuccess = data => {
  return {
    type: types.DELETE_APPOINTMENT_SUCCESS,
    payload: data,
  };
};
export const deleteAppointmentError = err => {
  return {
    type: types.DELETE_APPOINTMENT_ERROR,
    payload: err,
  };
};

