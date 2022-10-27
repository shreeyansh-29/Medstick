import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import { saveReminderError, saveReminderSuccess } from '../../action/Reminder/saveReminderAction';
import saveReminderNetworkService from '../../../network/networkServices/saveReminder/saveReminderNetworkService';

export function* saveReminderWorkerSaga(data) {
  try {
    let response = yield call(saveReminderNetworkService.saveReminder, data);
    console.log(response,"response");
    yield put(saveReminderSuccess(response));
  } catch (error) {
    yield put(saveReminderError(error));
  }
}

export function* saveReminderWatcherSaga() {
  yield takeLatest(types.SAVE_REMINDER_REQUEST, saveReminderWorkerSaga);
}
