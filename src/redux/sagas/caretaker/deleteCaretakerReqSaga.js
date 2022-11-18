import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deleteCaretakerReqError,
  deleteCaretakerReqSuccess,
} from '../../action/caretaker/deleteCaretakerReqAction';
import DeleteRequestService from '../../../network/networkServices/common/deleteRequestService'

export function* deleteCaretakerRequestSaga(data) {
  try {
    let response = yield call(DeleteRequestService.putDeleteRequest, data);
    console.log(response,"del response");
    yield put(deleteCaretakerReqSuccess(response));
  } catch (error) {
    yield put(deleteCaretakerReqError(error));
  }
}

export function* watchDeleteCaretakerReqSaga() {
  yield takeLatest(
    types.DELETE_CARETAKER_REQ_REQUEST,
    deleteCaretakerRequestSaga,
  );
}
