/* eslint-disable indent */
import {
  SAVE_APPOINTMENT_REQUEST,
  SAVE_APPOINTMENT_ERROR,
  SAVE_APPOINTMENT_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: {
    loader: false,
  },
  error: {
    error: null,
  },
};
export const saveAppointmentReminderReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SAVE_APPOINTMENT_REQUEST:
      console.log(action.payload,"request");
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case SAVE_APPOINTMENT_SUCCESS:
      console.log(action.payload,"success");
      return {
        ...state,
        data: action.payload,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
      };
    case SAVE_APPOINTMENT_ERROR:
      console.log(action.payload,"error");
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    default:
      return state;
  }
};
