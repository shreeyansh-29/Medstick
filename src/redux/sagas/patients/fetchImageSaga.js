import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  fetchImageError,
  fetchImageSuccess,
} from '../../action/patients/fetchImageAction';
import fetchImageService from '../../../network/networkServices/patients/fetchImageService';

export function* fetchImageSaga(data) {
  try {
    let response = yield call(fetchImageService.getImages, data);
    console.log(response);
    yield put(fetchImageSuccess(response?.data));
  } catch (error) {
    yield put(fetchImageError(error));
  }
}

export function* watchFetchImageSaga() {
  yield takeLatest(types.FETCH_IMAGE_REQUEST, fetchImageSaga);
}
