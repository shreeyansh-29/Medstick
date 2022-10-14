/* eslint-disable indent */
import {
    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_ERROR
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const deleteAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_APPOINTMENT_REQUEST:
      return {...state, isLoading: true};
    case DELETE_APPOINTMENT_SUCCESS:
      return {...state, data: action.payload};
    case DELETE_APPOINTMENT_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};
