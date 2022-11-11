import {call, put, takeLatest} from 'redux-saga/effects';
import {
  myPrescriptionsError,
  myPrescriptionsSuccess,
} from '../../action/otherScreenAction/prescriptionsAction';
import * as types from '../../actionTypes';
import myPrescriptionsService from '../../../network/networkServices/otherServices/myPrescriptionsService';

export function* myPrescriptionsSaga(data) {
  try {
    let response = yield call(myPrescriptionsService.getMyPrescriptions, data);
    yield put(myPrescriptionsSuccess(response?.data));
  } catch (error) {
    yield put(myPrescriptionsError(error));
  }
}

export function* watchMyPrescriptionsSaga() {
  yield takeLatest(types.MY_PRESCRIPTIONS_REQUEST, myPrescriptionsSaga);
}
