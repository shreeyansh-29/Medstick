/* eslint-disable indent */
import {
  RESET_SIGNUP,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {...state, isLoading: true};
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case SIGN_UP_ERROR:
      return {...state, error: action};
    case RESET_SIGNUP:
      return {data: null, isLoading: false, error: ''};
    default:
      return state;
  }
};
