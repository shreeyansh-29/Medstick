import {
  MEDICINE_LIST_CLEAR,
  MEDICINE_LIST_ERROR,
  MEDICINE_LIST_REQUEST,
  MEDICINE_LIST_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const medicineListReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEDICINE_LIST_REQUEST:
      return {...state, isLoading: true};
    case MEDICINE_LIST_SUCCESS:
      return {...state, data: action.payload.result, isLoading: false};
    case MEDICINE_LIST_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case MEDICINE_LIST_CLEAR:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
