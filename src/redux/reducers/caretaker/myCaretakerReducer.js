/* eslint-disable indent */
import {
  MY_CARETAKER_ERROR,
  MY_CARETAKER_REQUEST,
  MY_CARETAKER_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const myCaretakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_CARETAKER_REQUEST:
      return {...state, isLoading: true, error: null};
    case MY_CARETAKER_SUCCESS:
      return {...state, data: action.payload.result, isLoading: false};
    case MY_CARETAKER_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
