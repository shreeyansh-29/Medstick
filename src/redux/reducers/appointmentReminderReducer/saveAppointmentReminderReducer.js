/* eslint-disable indent */
import {
  SAVE_APPOINTMENT_REQUEST,
  SAVE_APPOINTMENT_ERROR,
  SAVE_APPOINTMENT_SUCCESS,
  SAVE_APPOINTMENT_CLEAR,
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
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case SAVE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
      };
    case SAVE_APPOINTMENT_ERROR:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    case SAVE_APPOINTMENT_CLEAR:
      return {
        data: null,
        isLoading: {
          loader: false,
        },
        error: {
          error: null,
        },
      };
    default:
      return state;
  }
};
