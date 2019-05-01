import { all, fork, put, takeEvery, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  GET_SHARE,
  GET_SHARE_LOOP,
  SHARE_TO_CUSP
} from '../constants/ActionTypes';
import { queryPOSTWithToken, queryGETWithToken } from '../util/requests2';
import errorUtil from '../util/errorUtil';
import {
  shareToCuspSuccess,
  shareToCuspFailed,
  getShareSuccess,
  getShareFailed
} from '../actions';

const prevShareState = state => state.shares;

function* getShareMethod({ shareId }) {
  const prevState = yield select(prevShareState);
  const id = shareId || prevState.shareId;

  try {
    const response = yield queryGETWithToken(`/api/shares/${id}`);

    if (response.data) {
      const params = {
        shareId: response.data.id,
        shareState: response.data.share_state
      };
      yield put(getShareSuccess(params));

      if (params.shareState === 'completed') {
        toast.success('Video successfully shared to the CUSP', {
          toastId: params.shareId
        });
        // Reset data in Redux to have an ability launch share again
        yield put(
          getShareSuccess({
            shareId: '',
            shareState: ''
          })
        );
      }
    }
  } catch (error) {
    const { errors } = error.response.data;

    errorUtil.showErrorFromArray(errors);
    yield put(getShareFailed());
  }
}

function* postToCuspMethod({ shareData }) {
  try {
    const response = yield queryPOSTWithToken('/api/shares', shareData);

    if (response.data) {
      const shareId = response.data.id;
      yield put(shareToCuspSuccess(shareId));
    }
  } catch (error) {
    const { errors } = error.response.data;

    errorUtil.showErrorFromArray(errors);
    yield put(shareToCuspFailed());
  }
}

export function* postToCusp() {
  yield takeEvery(SHARE_TO_CUSP, postToCuspMethod);
}

export function* getShare() {
  yield takeEvery(GET_SHARE, getShareMethod);
}

export function* getShareLoop() {
  yield takeEvery(GET_SHARE_LOOP, getShareMethod);
}

export default function* rootSaga() {
  yield all([fork(postToCusp), fork(getShare), fork(getShareLoop)]);
}
