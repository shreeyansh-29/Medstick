/* eslint-disable indent */
import {
  DELETE_PATIENT_REQ_ERROR,
  DELETE_PATIENT_REQ_REQUEST,
  DELETE_PATIENT_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const deletePatientReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PATIENT_REQ_REQUEST:
      return {...state, isLoading: true};
    case DELETE_PATIENT_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case DELETE_PATIENT_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
