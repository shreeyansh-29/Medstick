import * as types from '../../actionTypes';

export const medicineNotesRequest = payload => {
  return {
    type: types.MEDICINE_NOTES_REQUEST,
    payload,
  };
};

export const medicineNotesSuccess = payload => {
  return {
    type: types.MEDICINE_NOTES_SUCCESS,
    payload,
  };
};

export const medicineNotesError = payload => {
  return {
    type: types.MEDICINE_NOTES_ERROR,
    payload,
  };
};

export const medicineNotesClear = () => {
  return {
    type: types.MEDICINE_NOTES_CLEAR,
  };
};
