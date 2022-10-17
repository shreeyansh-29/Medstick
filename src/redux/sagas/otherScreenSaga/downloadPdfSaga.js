import {call, put, takeLatest} from 'redux-saga/effects';
import {
  downloadPdfError,
  downloadPdfSuccess,
} from '../../action/otherScreenAction/downloadPdfAction';
import * as types from '../../actionTypes';
import downloadPdfService from '../../../network/networkServices/common/downloadPdfService';

export function* downloadPdf(data) {
  try {
    let response = yield call(downloadPdfService.downloadPdf, data);
    yield put(downloadPdfSuccess(response?.data));
  } catch (error) {
    yield put(downloadPdfError(error));
  }
}

export function* watchDownloadPdf() {
  yield takeLatest(types.DOWNLOAD_PDF_REQUEST, downloadPdf);
}
