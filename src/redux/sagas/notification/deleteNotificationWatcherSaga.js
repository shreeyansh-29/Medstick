import {call, put, takeLatest} from 'redux-saga/effects';
import notificationNetworkService from '../../../network/networkServices/notification/notificationNetworkService';
import {
  errorDeleteNotification,
  successDeleteNotification,
} from '../../action/notification/deleteNotificationAction';
import {deleteNotification} from '../../constant/notification/deleteNotificationConstant';

export function* deleteNotificationWorkerSaga(data) {
  const {payload} = data;
  try {
    const response = yield call(
      notificationNetworkService.deleteNotification,
      payload,
    );
    yield put(successDeleteNotification(response?.data));
  } catch (error) {
    yield put(errorDeleteNotification(error));
  }
}

export function* deleteNotificationWatcherSaga() {
  yield takeLatest(
    deleteNotification.deleteNotificationLoad,
    deleteNotificationWorkerSaga,
  );
}
