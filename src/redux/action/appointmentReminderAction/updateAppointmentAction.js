import * as types from '../../actionTypes';

export const updateAppointmentRequest = (fDate, time, notes1, appointmentId) => {
  return {
    type: types.UPDATE_APPOINTMENT_REQUEST,
    payload: {
      fDate,
      time,
      notes1,
      appointmentId
    },
  };
};
export const updateAppointmentSuccess = data => {
  return {
    type: types.UPDATE_APPOINTMENT_SUCCESS,
    payload: data,
  };
};
export const updateAppointmentError = err => {
  return {
    type: types.UPDATE_APPOINTMENT_ERROR,
    payload: err,
  };
};

