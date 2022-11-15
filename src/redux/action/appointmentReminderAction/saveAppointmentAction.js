import * as types from '../../actionTypes';

export const saveAppointmentRequest = (fDate, time, notes1, notes) => {
  return {
    type: types.SAVE_APPOINTMENT_REQUEST,
    payload: {
      fDate,
      time,
      notes1,
      notes,
    },
  };
};
export const saveAppointmentSuccess = data => {
  return {
    type: types.SAVE_APPOINTMENT_SUCCESS,
    payload: data,
  };
};
export const saveAppointmentError = err => {
  return {
    type: types.SAVE_APPOINTMENT_ERROR,
    payload: err,
  };
};

export const saveAppointmentClear = () => {
  return {
    type: types.SAVE_APPOINTMENT_CLEAR,
  };
};
