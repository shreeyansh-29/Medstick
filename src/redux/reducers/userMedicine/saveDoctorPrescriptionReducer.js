import {
    SAVE_PRESCRIPTION_REQUEST,
    SAVE_PRESCRIPTION_SUCCESS,
    SAVE_PRESCRIPTION_ERROR
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};

export const medicineListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_PRESCRIPTION_REQUEST:
      return {...state, isLoading: true};
    case SAVE_PRESCRIPTION_SUCCESS: {
      return {...state, data: action.payload};
    }
    case SAVE_PRESCRIPTION_ERROR: {
      return {...state, error: action.err};
    }
    default:
      return state;
  }
};
