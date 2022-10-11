import * as types from '../../actionTypes';

export const saveAppointmentRequest = (fDate, time, notes1) => {
  return {
    type: types.SAVE_APPOINTMENT_REQUEST,
    payload: {
      fDate,
      time,
      notes1,
    },
  };
};
export const saveAppointmentSuccess = data => {
  return {
    type: types.SAVE_APPOINTMENT_SUCCESS,
    payload:data,
  };
};
export const saveAppointmentError = err => {
  return {
    type: types.SAVE_APPOINTMENT_ERROR,
    payload:err,
  };
};
