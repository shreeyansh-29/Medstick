/* eslint-disable indent */
import {
  CARETAKER_LIST_REQUEST,
  CARETAKER_LIST_SUCCESS,
  CARETAKER_LIST_ERROR,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const caretakerRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARETAKER_LIST_REQUEST:
      return {...state, isLoading: true};
    case CARETAKER_LIST_SUCCESS:
      return {...state, data: action.payload.data, isLoading: false};
    case CARETAKER_LIST_ERROR:
      return {...state, error: action};
    default:
      return state;
  }
};
