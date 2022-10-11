/* eslint-disable indent */
import {
    SAVE_APPOINTMENT_REQUEST,
    SAVE_APPOINTMENT_ERROR,
    SAVE_APPOINTMENT_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const saveAppointmentReminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APPOINTMENT_REQUEST:
      return {...state, isLoading: true};
    case SAVE_APPOINTMENT_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case SAVE_APPOINTMENT_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};


