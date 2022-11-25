import * as types from '../../actionTypes';

export const feedbackRequest = payload => {
  return {
    type: types.FEEDBACK_REQUEST,
    payload,
  };
};
export const feedbackSuccess = payload => {
  return {
    type: types.FEEDBACK_SUCCESS,
    payload,
  };
};
export const feedbackError = payload => {
  return {
    type: types.FEEDBACK_ERROR,
    payload,
  };
};

