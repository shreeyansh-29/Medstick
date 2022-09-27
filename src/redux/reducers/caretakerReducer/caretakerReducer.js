/* eslint-disable indent */
import {
  MY_CARETAKER_ERROR,
  MY_CARETAKER_SUCCESS,
  MY_CARETAKER_REQUEST,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const myCaretakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_CARETAKER_REQUEST:
      console.log('Request');
      return {...state, isLoading: true};
    case MY_CARETAKER_SUCCESS:
      console.log(action,"Success");
      return {...state, data: action.payload.data, isLoading:false};
    case MY_CARETAKER_ERROR:
      console.log('Error')
      return {...state, error: action};
    default:
      return state;
  }
};

