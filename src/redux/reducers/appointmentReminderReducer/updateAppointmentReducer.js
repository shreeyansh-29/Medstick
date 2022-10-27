/* eslint-disable indent */
import {
  UPDATE_APPOINTMENT_ERROR,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
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
export const updateAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
        data: action.payload,
      };
    case UPDATE_APPOINTMENT_ERROR:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    default:
      return state;
  }
};
