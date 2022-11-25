import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import editProfileService from '../../../network/networkServices/profile/editProfileService';
import { feedbackError, feedbackSuccess } from '../../action/profileAction/feedbackAction';

export function* feedbackSaga(data) {
  try {
    let response = yield call(editProfileService.editProfile, data);
    yield put(feedbackSuccess(response.data));
  } catch (error) {
    yield put(feedbackError(error));
  }
}

export function* feedbackWatcherSaga() {
  yield takeLatest(types.FEEDBACK_REQUEST, feedbackSaga);
}
