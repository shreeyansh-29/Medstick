import {
    FEEDBACK_ERROR,
    FEEDBACK_SUCCESS,
    FEEDBACK_REQUEST
  } from '../../actionTypes';
  
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };
  export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case FEEDBACK_REQUEST:
        return {...state, isLoading: true};
      case FEEDBACK_SUCCESS:
        return {...state, data: action.payload};
      case FEEDBACK_ERROR:
        return {...state, error: action};
      default:
        return state;
    }
  };
  