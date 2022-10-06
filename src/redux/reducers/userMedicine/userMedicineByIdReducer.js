import {USER_MEDICINE_BY_ID_REQUEST,
    USER_MEDICINE_BY_ID_ERROR,
    USER_MEDICINE_BY_ID_SUCCESS
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};

export const userMedicineByIdReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_MEDICINE_BY_ID_REQUEST:
      return {...state, isLoading: true};
    case USER_MEDICINE_BY_ID_SUCCESS: {
      return {...state, data: action.payload};
    }
    case USER_MEDICINE_BY_ID_ERROR: {
      return {...state, error: action.err};
    }
    default:
      return state;
  }
};


