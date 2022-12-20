/* eslint-disable indent */
import {
  ACCEPT_PATIENT_REQ_ERROR,
  ACCEPT_PATIENT_REQ_REQUEST,
  ACCEPT_PATIENT_REQ_SUCCESS,
  CLEAR_REQUEST_STATUS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const acceptPatientReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_PATIENT_REQ_REQUEST:
      return {...state, isLoading: true};
    case ACCEPT_PATIENT_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case ACCEPT_PATIENT_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case CLEAR_REQUEST_STATUS:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
