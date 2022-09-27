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
export const caretakerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARETAKER_LIST_REQUEST:
      console.log('Request');
      return {...state, isLoading: true};
    case CARETAKER_LIST_SUCCESS:
      console.log('Success');
      return {...state, data: action.payload.data, isLoading: false};
    case CARETAKER_LIST_ERROR:
      return {...state, error: action};
    default:
      return state;
  }
};
