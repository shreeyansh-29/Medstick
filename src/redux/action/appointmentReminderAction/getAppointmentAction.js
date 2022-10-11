import * as types from '../../actionTypes';

export const getAppointmentRequest = payload => {
  return {
    type: types.GET_APPOINTMENT_REQUEST,
    payload,
  };
};
export const getAppointmentSuccess = payload => {
  return {
    type: types.GET_APPOINTMENT_SUCCESS,
    payload,
  };
};
export const getAppointmentError = payload => {
  return {
    type: types.GET_APPOINTMENT_ERROR,
    payload,
  };
};

