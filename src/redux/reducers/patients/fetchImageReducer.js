/* eslint-disable indent */
import {
  FETCH_IMAGE_ERROR,
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const fetchImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGE_REQUEST:
      return {...state, isLoading: true};
    case FETCH_IMAGE_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case FETCH_IMAGE_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
