/* eslint-disable indent */
import {
    GET_APPOINTMENT_ERROR,
    GET_APPOINTMENT_SUCCESS,
    GET_APPOINTMENT_REQUEST
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const getAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_REQUEST:
      return {...state, isLoading: true};
    case GET_APPOINTMENT_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case GET_APPOINTMENT_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};


