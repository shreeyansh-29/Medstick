import {
    SAVE_REMINDER_REQUEST,
    SAVE_REMINDER_SUCCESS,
    SAVE_REMINDER_ERROR
  } from '../../actionTypes';
  
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };
  export const saveReminderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_REMINDER_REQUEST:
        return {...state, isLoading: true};
      case SAVE_REMINDER_SUCCESS:
        return {...state, data: action.payload, isLoading: false};
      case SAVE_REMINDER_ERROR:
        return {...state, error: action.payload, isLoading: false};
      default:
        return state;
    }
  };

