/* eslint-disable indent */
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_LOGIN,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoading: true};
    case LOGIN_SUCCESS:
      return {...state, data: action.payload.data};
    case LOGIN_ERROR:
      return {...state, error: action};
    case RESET_LOGIN:
      return {data: null, isLoading: false, error: ''};
    default:
      return state;
  }
};
