/* eslint-disable indent */
import {
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return {...state, isLoading: true};
    case EDIT_PROFILE_SUCCESS:
      return {...state, data: action.payload.data};
    case EDIT_PROFILE_ERROR:
      return {...state, error: action};

    default:
      return state;
  }
};
