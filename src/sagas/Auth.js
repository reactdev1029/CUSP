import { push } from 'react-router-redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { POST, GET } from '../util/request';
import {
  SIGNIN_USER,
  CHECK_USER,
  SIGNOUT_USER
} from '../constants/ActionTypes';
import {
  userSignInSuccess,
  userSignInFailed,
  checkUserSuccess,
  userSignOutSuccess,
  userSignOutFailed
} from '../actions/Auth';

const signInUserWithEmailPasswordRequest = async data =>
  await POST(`/api/auth/login/cusp`, {
    headers: {
      'Content-Type': 'application/json',
      'Standalone-Application': 'seriea'
    },
    data
  })
    .then(response => response)
    .catch(error => error.response);

const checkUserCall = async () =>
  await GET(`/api/auth/check/user?email=${localStorage.getItem('email')}`, {
    headers: {
      'Content-Type': 'application/json',
      'Standalone-Application': 'seriea'
    }
  })
    .then(response => response)
    .catch(error => error.response);

const signOutUserCall = async () =>
  await POST(`/api/auth/logout`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Standalone-Application': 'seriea'
    }
  })
    .then(response => response)
    .catch(error => error.response);

function* signInUserWithEmailPassword({ data }) {
  const { email } = data;
  try {
    const signInUser = yield call(signInUserWithEmailPasswordRequest, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(userSignInSuccess(signInUser.data.token));
      localStorage.setItem('user_id', signInUser.data.user_id);
      localStorage.setItem('token', signInUser.data.token);
      localStorage.setItem('email', email);
      yield put(push('/'));
    } else {
      yield put(userSignInFailed(signInUser.data));
    }
  } catch (error) {
    yield put(userSignInFailed(error));
  }
}

function* checkUserRequest() {
  try {
    const checkUser = yield call(checkUserCall);
    if (checkUser.status >= 200 && checkUser.status < 400) {
      yield put(checkUserSuccess(checkUser.data.status));
    }
  } catch (error) {
    console.error(error);
  }
}

function* signOutUserRequest() {
  try {
    const signInUser = yield call(signOutUserCall);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(userSignOutSuccess());
      localStorage.clear();
      yield put(push('/login'));
    } else {
      yield put(userSignOutFailed(signInUser.data));
    }
  } catch (error) {
    yield put(userSignOutFailed(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* checkUser() {
  yield takeEvery(CHECK_USER, checkUserRequest);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOutUserRequest);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(checkUser), fork(signOutUser)]);
}
