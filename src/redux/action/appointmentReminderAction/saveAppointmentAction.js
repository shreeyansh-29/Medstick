import * as types from '../../actionTypes';

export const saveAppointmentRequest = payload => {
  return {
    type: types.SAVE_APPOINTMENT_REQUEST,
    payload,
  };
};
export const saveAppointmentSuccess = payload => {
  return {
    type: types.SAVE_APPOINTMENT_SUCCESS,
    payload,
  };
};
export const saveAppointmentError = payload => {
  return {
    type: types.SAVE_APPOINTMENT_ERROR,
    payload,
  };
};

