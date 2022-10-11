import {call, put, takeLatest} from 'redux-saga/effects';
import {
  editProfileError,
  editProfileSuccess,
} from '../../action/profileAction/editProfileAction';
import * as types from '../../actionTypes';
import editProfileService from '../../../network/networkServices/profile/editProfileService';

export function* editProfileSaga(data) {
  try {
    let response = yield call(editProfileService.editProfile, data);
    yield put(editProfileSuccess(response.data));
  } catch (error) {
    yield put(editProfileError(error));
  }
}

export function* watchEditProfileSaga() {
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfileSaga);
}
