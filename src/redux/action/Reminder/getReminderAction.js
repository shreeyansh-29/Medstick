import * as types from '../../actionTypes';

const loadGetReminder = date => {
  return {
    type: types.GET_REMINDER_REQUEST,
    payload: data,
  };
};

const successGetReminder = data => {
  return {
    type: types.GET_REMINDER_SUCCESS,
    payload: data,
  };
};

const errorGetReminder = error => {
  return {
    type: types.GET_REMINDER_ERROR,
    payload: error,
  };
};

export {
  loadGetReminder,
  successGetReminder,
  errorGetReminder
};


