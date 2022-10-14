/* eslint-disable indent */
import {
  USER_PRESCRIPTIONS_ERROR,
  USER_PRESCRIPTIONS_REQUEST,
  USER_PRESCRIPTIONS_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const viewPrescriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PRESCRIPTIONS_REQUEST:
      return {...state, isLoading: true, error: null};
    case USER_PRESCRIPTIONS_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case USER_PRESCRIPTIONS_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
