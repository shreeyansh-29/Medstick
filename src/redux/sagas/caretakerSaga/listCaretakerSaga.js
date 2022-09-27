import {call, put, takeLatest} from 'redux-saga/effects';
import myCaretakerRequestNetworkServices from '../../../network/careTaker/myCaretakerRequestNetworkServices';
import { listCaretakerSuccess, listCaretakerError } from '../../action/caretakerAction/caretakerRequestAction';
import * as types from '../../actionTypes';

export function* myCaretakerRequestSaga(data) {
  try {
    let response = yield call(myCaretakerRequestNetworkServices.myCaretakerRequest, data);
    console.log(response,"response");
    yield put(listCaretakerSuccess(response));
  } catch (error) {
    yield put(listCaretakerError(error));
  }
}

export function* watchMyCaretakerListSaga() {
  yield takeLatest(types.CARETAKER_LIST_REQUEST, myCaretakerRequestSaga);
}

