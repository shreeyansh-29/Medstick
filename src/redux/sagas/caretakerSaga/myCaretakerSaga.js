import {call, put, takeLatest} from 'redux-saga/effects';
import myCaretakerNetworkServices from '../../../network/careTaker/myCaretakerNetworkServices';
import {
  caretakerSuccess,
  caretakerError,
} from '../../action/caretakerAction/myCaretakerAction';
import * as types from '../../actionTypes';

export function* myCaretakerSaga(data) {
  try {
    let response = yield call(myCaretakerNetworkServices.myCaretaker, data);
    console.log(response,"response");
    yield put(caretakerSuccess(response));
  } catch (error) {
    yield put(caretakerError(error));
  }
}

export function* watchMyCaretakerSaga() {
  yield takeLatest(types.MY_CARETAKER_REQUEST, myCaretakerSaga);
}

