import {
  USER_MEDICINE_ERROR,
  USER_MEDICINE_REQUEST,
  USER_MEDICINE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};

export const medicineListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_MEDICINE_REQUEST:
      return {...state, isLoading: true};
    case USER_MEDICINE_SUCCESS: {
      return {...state, data: action.payload};
    }
    case USER_MEDICINE_ERROR: {
      return {...state,error: action};
    }
    default: 
      return state;
  }
};
