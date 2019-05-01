import { all, fork, put, takeEvery, select } from 'redux-saga/effects';
import { queryGETWithToken } from '../util/requests2';
import {
  GET_SEARCHED_VIDEOS,
  GET_SEARCHED_VIDEOS_NEXT
} from '../constants/ActionTypes';
import { getSearchedVideosSuccess, getSearchedVideosFailed } from '../actions';

const prevSearchState = state => state.structuredSearch;

function* getSearchedVideosMethod({ queryUrl }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/clips/search${queryUrl}`
    );
    const videosData = response.data;

    yield put(getSearchedVideosSuccess(videosData));
  } catch ({ response }) {
    yield put(getSearchedVideosFailed(response));
  }
}

function* getSearchedVideosNextMethod({ queryUrl }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/clips/search${queryUrl}`
    );

    let videosData = response.data;
    if (queryUrl.includes('cursor')) {
      const { searchedVideosData } = yield select(prevSearchState);
      if (searchedVideosData.results.length) {
        videosData = {
          ...videosData,
          results: [...searchedVideosData.results, ...videosData.results]
        };
      }
    }

    yield put(getSearchedVideosSuccess(videosData));
  } catch ({ response }) {
    yield put(getSearchedVideosFailed(response));
  }
}

export function* getSearchedVideos() {
  yield takeEvery(GET_SEARCHED_VIDEOS, getSearchedVideosMethod);
}

export function* getSearchedVideosNext() {
  yield takeEvery(GET_SEARCHED_VIDEOS_NEXT, getSearchedVideosNextMethod);
}

export default function* rootSaga() {
  yield all([fork(getSearchedVideos), fork(getSearchedVideosNext)]);
}
