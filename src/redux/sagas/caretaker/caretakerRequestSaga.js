import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  caretakerReqError,
  caretakerReqSuccess,
} from '../../action/caretaker/caretakerRequestAction';
import caretakerRequestService from '../../../network/networkServices/caretaker/caretakerRequestService';

export function* caretakerRequestSaga(data) {
  try {
    let response = yield call(
      caretakerRequestService.getCaretakerRequest,
      data,
    );
    yield put(caretakerReqSuccess(response?.data));
  } catch (error) {
    yield put(caretakerReqError(error));
  }
}

export function* watchCaretakerRequestSaga() {
  yield takeLatest(types.CARETAKER_REQ_REQUEST, caretakerRequestSaga);
}
