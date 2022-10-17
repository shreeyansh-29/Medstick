/* eslint-disable indent */
import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  RESET_USER,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {...state, isLoading: true};
    case GET_USER_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case GET_USER_ERROR:
      return {...state, error: action.payload};
    case RESET_USER:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
