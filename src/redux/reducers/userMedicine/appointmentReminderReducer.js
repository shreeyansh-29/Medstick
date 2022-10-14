/* eslint-disable indent */
import {
    APPOINTMENT_REMINDER_ERROR,
    APPOINTMENT_REMINDER_SUCCESS,
    APPOINTMENT_REMINDER_REQUEST
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const appointmentReminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPOINTMENT_REMINDER_REQUEST:
      return {...state, isLoading: true};
    case APPOINTMENT_REMINDER_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case APPOINTMENT_REMINDER_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};

