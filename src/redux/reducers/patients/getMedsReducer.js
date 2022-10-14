/* eslint-disable indent */
import {
  GET_MED_HISTORY_ERROR,
  GET_MED_HISTORY_REQUEST,
  GET_MED_HISTORY_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const getMedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MED_HISTORY_REQUEST:
      return {...state, isLoading: true};
    case GET_MED_HISTORY_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case GET_MED_HISTORY_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
