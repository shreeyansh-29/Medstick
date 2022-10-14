/* eslint-disable indent */
import {
  ACCEPT_CARETAKER_REQ_ERROR,
  ACCEPT_CARETAKER_REQ_REQUEST,
  ACCEPT_CARETAKER_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};
export const acceptCaretakerReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_CARETAKER_REQ_REQUEST:
      return {...state, isLoading: true};
    case ACCEPT_CARETAKER_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case ACCEPT_CARETAKER_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
