/* eslint-disable indent */
import {
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_ERROR,
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
export const deleteAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
      };
    case DELETE_APPOINTMENT_ERROR:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    default:
      return state;
  }
};
