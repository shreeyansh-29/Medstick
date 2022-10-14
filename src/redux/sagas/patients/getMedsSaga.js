import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  getMedsError,
  getMedsSuccess,
} from '../../action/patients/getMedsAction';
import getMedicinesService from '../../../network/networkServices/patients/getMedsService';

export function* getMedsSaga(data) {
  try {
    let response = yield call(getMedicinesService.getGetMedicines, data);
    yield put(getMedsSuccess(response?.data));
  } catch (error) {
    yield put(getMedsError(error));
  }
}

export function* watchGetMedsSaga() {
  yield takeLatest(types.GET_MED_HISTORY_REQUEST, getMedsSaga);
}
