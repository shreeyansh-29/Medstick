import {call, put, takeLatest} from 'redux-saga/effects';
import myCaretakerRequestNetworkServices from '../../../network/careTaker/myCaretakerRequestNetworkServices';
import { caretakerRequestError, caretakerRequestSuccess } from '../../action/caretakerAction/caretakerRequestAction';
import * as types from '../../actionTypes';

export function* myCaretakerRequestSaga(data) {
  try {
    let response = yield call(myCaretakerRequestNetworkServices.myCaretakerRequest, data);
    console.log(response,"response");
    yield put(caretakerRequestSuccess(response));
  } catch (error) {
    yield put(caretakerRequestError(error));
  }
}

export function* watchMyCaretakerRequestSaga() {
  yield takeLatest(types.CARETAKER_REQUEST_REQUEST, myCaretakerRequestSaga);
}

