/* eslint-disable indent */
import {STORE_ERROR, STORE_REQUEST, STORE_SUCCESS} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_REQUEST:
      return {...state, data:null, isLoading: true, error:null};
    case STORE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error:null
      };
    case STORE_ERROR:
      return {...state, error: action.payload, data: null, isLoading: false};
    default:
      return state;
  }
};
