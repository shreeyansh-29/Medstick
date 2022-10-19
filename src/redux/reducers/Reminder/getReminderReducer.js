/* eslint-disable indent */
import {GET_REMINDER_REQUEST,
    GET_REMINDER_SUCCESS,
    GET_REMINDER_ERROR
  } from '../../actionTypes';
  
  const initialState = {
    data: null,
    isLoading: {
      loader: false,
    },
    error: {
      error: null,
    },
  };
  export const getReminderReducer = (
    state = initialState,
    action={},
  ) => {
    switch (action.type) {
      case GET_REMINDER_REQUEST:
        return {
          ...state,
          isLoading: {...state.isLoading, loader: true},
          error: {...state.error, error: null},
        };
      case GET_REMINDER_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: {...state.isLoading, loader: false},
          error: {...state.error, error: null},
        };
      case GET_REMINDER_ERROR:
        return {
          ...state,
          isLoading: {...state.isLoading, loader: false},
          error: {...state.error, error: action.payload},
        };
      default:
        return state;
    }
  };
  
