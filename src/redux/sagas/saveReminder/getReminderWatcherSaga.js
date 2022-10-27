import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import getUserProfileService from '../../../network/networkServices/profile/getUserProfileService';
import { errorGetReminder, successGetReminder } from '../../action/Reminder/getReminderAction';

export function* getReminderWorkerSaga() {
  try {
    let response = yield call(getUserProfileService.getProfile);
    yield put(successGetReminder(response.data));
  } catch (error) {
    yield put(errorGetReminder(error));
  }
}
export function* getReminderWatcherSaga() {
  yield takeLatest(types.GET_REMINDER_REQUEST, getReminderWorkerSaga);
}

