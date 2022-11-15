import * as types from '../../actionTypes';

export const updateAppointmentRequest = payload => {
  return {
    type: types.UPDATE_APPOINTMENT_REQUEST,
    payload,
  };
};
export const updateAppointmentSuccess = payload => {
  return {
    type: types.UPDATE_APPOINTMENT_SUCCESS,
    payload,
  };
};
export const updateAppointmentError = payload => {
  return {
    type: types.UPDATE_APPOINTMENT_ERROR,
    payload,
  };
};
export const updateAppointmentClear = () => {
  return {
    type: types.UPDATE_APPOINTMENT_CLEAR,
  };
};
