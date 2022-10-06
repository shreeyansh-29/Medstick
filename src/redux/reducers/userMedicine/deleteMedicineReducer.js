/* eslint-disable indent */
import {
  DELETE_MEDICINE_ERROR,
  DELETE_MEDICINE_REQUEST,
  DELETE_MEDICINE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const deleteMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MEDICINE_REQUEST:
      return {...state, isLoading: true};
    case DELETE_MEDICINE_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case DELETE_MEDICINE_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
