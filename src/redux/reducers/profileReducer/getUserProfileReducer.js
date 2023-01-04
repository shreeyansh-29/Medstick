/* eslint-disable indent */
import {
  USER_PROFILE_ERROR,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const getUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {...state, isLoading: true};
    case USER_PROFILE_SUCCESS:
      return {...state, data: action.payload.result, isLoading: false};
    case USER_PROFILE_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};

    default:
      return state;
  }
};
