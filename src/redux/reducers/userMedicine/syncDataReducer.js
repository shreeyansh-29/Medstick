import {
  SYNC_DATA_ERROR,
  SYNC_DATA_REQUEST,
  SYNC_DATA_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const syncDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_DATA_REQUEST:
      return {...state, isLoading: true};
    case SYNC_DATA_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case SYNC_DATA_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    default:
      return state;
  }
};
