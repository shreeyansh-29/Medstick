/* eslint-disable indent */
import {
  DELETE_CARETAKER_REQ_ERROR,
  DELETE_CARETAKER_REQ_REQUEST,
  DELETE_CARETAKER_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: '',
  isLoading: false,
  error: null,
};
export const deleteCaretakerReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CARETAKER_REQ_REQUEST:
      return {...state, isLoading: true};
    case DELETE_CARETAKER_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case DELETE_CARETAKER_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
