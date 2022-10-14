import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  notifyUserError,
  notifyUserSuccess,
} from '../../action/patients/notifyUserAction';
import notifyUserService from '../../../network/networkServices/patients/notifyUserService';

export function* notifyUserSaga(data) {
  console.log(data);
  try {
    let response = yield call(notifyUserService.postNotification, data);
    yield put(notifyUserSuccess(response?.data));
  } catch (error) {
    yield put(notifyUserError(error));  
  }
}

export function* watchNotifyUserSaga() {
  yield takeLatest(types.NOTIFY_USER_REQUEST, notifyUserSaga);
}
