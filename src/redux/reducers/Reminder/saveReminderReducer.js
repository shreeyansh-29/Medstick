/* eslint-disable indent */
import {
  SAVE_REMINDER_REQUEST,
  SAVE_REMINDER_ERROR,
  SAVE_REMINDER_SUCCESS,
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
export const saveReminderReducer = (
  state = initialState,
  action={},
) => {
  switch (action.type) {
    case SAVE_REMINDER_REQUEST:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: true},
        error: {...state.error, error: null},
      };
    case SAVE_REMINDER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: null},
      };
    case SAVE_REMINDER_ERROR:
      return {
        ...state,
        isLoading: {...state.isLoading, loader: false},
        error: {...state.error, error: action.payload},
      };
    default:
      return state;
  }
};

