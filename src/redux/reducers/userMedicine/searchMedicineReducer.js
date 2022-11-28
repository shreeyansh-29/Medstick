import {
  SEARCH_MEDICINE_ERROR,
  SEARCH_MEDICINE_SUCCESS,
  SEARCH_MEDICINE_REQUEST,
  SEARCH_MEDICINE_CLEAR,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const searchMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MEDICINE_REQUEST:
      return {...state, isLoading: true};
    case SEARCH_MEDICINE_SUCCESS: {
      return {...state, data: action.payload.result, isLoading: false};
    }
    case SEARCH_MEDICINE_ERROR: {
      return {...state, error: action.payload, isLoading: false};
    }
    case SEARCH_MEDICINE_CLEAR: {
      return {data: null, isLoading: false, error: null};
    }
    default:
      return state;
  }
};
