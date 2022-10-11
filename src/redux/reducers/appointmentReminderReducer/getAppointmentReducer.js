/* eslint-disable indent */
import {
  GET_APPOINTMENT_ERROR,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
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
export const getAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case GET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
      };
    case GET_APPOINTMENT_ERROR:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    default:
      return state;
  }
};
