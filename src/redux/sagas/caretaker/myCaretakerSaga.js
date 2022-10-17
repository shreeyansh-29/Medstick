import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  myCaretakerError,
  myCaretakerSuccess,
} from '../../action/caretaker/myCaretakerAction';
import myCaretakerService from '../../../network/networkServices/caretaker/myCaretakerService';

export function* myCaretakerSaga(data) {
  try {
    let response = yield call(myCaretakerService.getMyCaretaker, data);
    yield put(myCaretakerSuccess(response?.data));
  } catch (error) {
    yield put(myCaretakerError(error));
  }
}

export function* watchMyCaretakerSaga() {
  yield takeLatest(types.MY_CARETAKER_REQUEST, myCaretakerSaga);
}
