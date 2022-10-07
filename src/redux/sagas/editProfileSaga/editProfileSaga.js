import {call, put, takeLatest} from 'redux-saga/effects';
import {
  editProfileError,
  editProfileSuccess,
} from '../../action/editProfileAction/editProfileAction';
import * as types from '../../actionTypes';
import editProfileService from '../../../network/networkServices/editProfile/editProfileService';

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
