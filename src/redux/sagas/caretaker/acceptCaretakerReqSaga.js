import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  acceptCaretakerReqError,
  acceptCaretakerReqSuccess,
} from '../../action/caretaker/acceptCaretakerReqAction';
import acceptCaretakerReqService from '../../../network/networkServices/common/acceptRequestService';

export function* acceptCaretakerRequestSaga(data) {
  try {
    let response = yield call(acceptCaretakerReqService.putAcceptRequest, data);
    yield put(acceptCaretakerReqSuccess(response));
  } catch (error) {
    yield put(acceptCaretakerReqError(error));
  }
}

export function* watchAcceptCaretakerReqSaga() {
  yield takeLatest(
    types.ACCEPT_CARETAKER_REQ_REQUEST,
    acceptCaretakerRequestSaga,
  );
}
