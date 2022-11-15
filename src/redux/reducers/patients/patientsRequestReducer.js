/* eslint-disable indent */
import {
  PATIENT_REQ_ERROR,
  PATIENT_REQ_REQUEST,
  PATIENT_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const patientsRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_REQ_REQUEST:
      return {...state, isLoading: true};
    case PATIENT_REQ_SUCCESS:
      return {...state, data: action.payload.result, isLoading: false};
    case PATIENT_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
