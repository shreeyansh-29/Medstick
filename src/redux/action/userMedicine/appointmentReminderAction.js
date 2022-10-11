import * as types from '../../actionTypes';

export const appointmentReminderRequest = payload => {console.log("hrloofk");
  return {
    type: types.APPOINTMENT_REMINDER_REQUEST,
    payload,
  };
};
export const appointmentReminderSuccess = payload => {
  return {
    type: types.APPOINTMENT_REMINDER_SUCCESS,
    payload,
  };
};
export const appointmentReminderError = payload => {
  return {
    type: types.APPOINTMENT_REMINDER_ERROR,
    payload,
  };
};

