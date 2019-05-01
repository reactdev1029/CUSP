import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { queryGETWithToken } from '../util/requests2';
import { GET_USER_PROFILE } from '../constants/ActionTypes';
import { getUserProfileSuccess, getUserProfileFailed } from '../actions';

function* getUserProfileRequest() {
  try {
    const response = yield queryGETWithToken(
      `/api/accounts/${localStorage.getItem('user_id')}`
    );

    yield put(getUserProfileSuccess(response.data));
  } catch ({ response }) {
    yield put(getUserProfileFailed(response));
  }
}

export function* getUserProfile() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileRequest);
}

export default function* rootSaga() {
  yield all([fork(getUserProfile)]);
}
