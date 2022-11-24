import {
  SEARCH_MEDICINE_ERROR,
  SEARCH_MEDICINE_SUCCESS,
  SEARCH_MEDICINE_REQUEST,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const searchMedicineReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_MEDICINE_REQUEST:
      return {...state, isLoading: true};
    case SEARCH_MEDICINE_SUCCESS: {
      return {...state, data: action.payload, isLoading: false};
    }
    case SEARCH_MEDICINE_ERROR: {
      return {...state, error: action.err, isLoading: false};
    }
    default:
      return state;
  }
};
