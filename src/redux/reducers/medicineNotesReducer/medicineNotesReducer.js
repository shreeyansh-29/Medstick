import {
  MEDICINE_NOTES_REQUEST,
  MEDICINE_NOTES_SUCCESS,
  MEDICINE_NOTES_ERROR,
  MEDICINE_NOTES_CLEAR,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const MedicineNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEDICINE_NOTES_REQUEST:
      return {...state, isLoading: true};
    case MEDICINE_NOTES_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case MEDICINE_NOTES_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case MEDICINE_NOTES_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
