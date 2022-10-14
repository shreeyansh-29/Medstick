import * as types from '../../actionTypes';

export const fetchImageRequest = payload => {
  return {
    type: types.FETCH_IMAGE_REQUEST,
    payload,
  };
};
export const fetchImageSuccess = payload => {
  return {
    type: types.FETCH_IMAGE_SUCCESS,
    payload,
  };
};
export const fetchImageError = payload => {
  return {
    type: types.FETCH_IMAGE_ERROR,
    payload,
  };
};
