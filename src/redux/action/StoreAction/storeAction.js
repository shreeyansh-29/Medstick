import * as types from '../../actionTypes';

export const storeRequest = payload => {
  console.log(payload,"request payload");
  return {
    type: types.STORE_REQUEST,
    payload
  };
};

export const storeSuccess = payload => {
  console.log(payload,"success payload");
  return {
    type: types.STORE_SUCCESS,
    payload
  };
};

export const storeError = payload => {
  return {
    type: types.STORE_ERROR,
    payload
  };
};
