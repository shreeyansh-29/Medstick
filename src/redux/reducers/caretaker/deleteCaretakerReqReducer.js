/* eslint-disable indent */
import {
  DELETE_CARETAKER_REQ_ERROR,
  DELETE_CARETAKER_REQ_REQUEST,
  DELETE_CARETAKER_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: '',
  isLoading: false,
  error: '',
};
export const deleteCaretakerReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CARETAKER_REQ_REQUEST:
      console.log(action);
      return {...state, isLoading: true};
    case DELETE_CARETAKER_REQ_SUCCESS:
      console.log(action);
      return {...state, data: action.payload, isLoading: false};
    case DELETE_CARETAKER_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
};
