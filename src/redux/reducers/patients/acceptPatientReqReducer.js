/* eslint-disable indent */
import {
  ACCEPT_PATIENT_REQ_ERROR,
  ACCEPT_PATIENT_REQ_REQUEST,
  ACCEPT_PATIENT_REQ_SUCCESS,
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
      return {...state, data: action.payload};
    case ACCEPT_PATIENT_REQ_ERROR:
      return {...state, error: action};
    default:
      return state;
  }
};
