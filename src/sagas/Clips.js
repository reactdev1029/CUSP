import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { GET } from '../util/request';
import {
  queryGETWithToken,
  queryPOSTWithToken,
  queryDELETEWithToken
} from '../util/requests2';
import {
  GET_CLIPS_LATEST,
  GET_CLIPS,
  GET_GAMES_SCHEDULE,
  GET_SIMILAR_CLIPS,
  GET_CLIPS_BOOKMARKS,
  GET_CLIPS_SEARCHES,
  GET_CLIPS_LIVE,
  POST_CLIPS_BOOKMARKS,
  DELETE_CLIPS_BOOKMARKS,
  GET_CLIP_BY_ID
} from '../constants/ActionTypes';
import {
  getClipsLatestSuccess,
  getClipsLatestFailed,
  getClipsSuccess,
  getClipsFailed,
  getGamesScheduleSuccess,
  getGamesScheduleFailed,
  getSimilarClipsSuccess,
  getSimilarClipsFailed,
  getClipsBookmarksSuccess,
  getClipsBookmarksFailed,
  getClipsSearchesSuccess,
  getClipsSearchesFailed,
  getClipsLiveSuccess,
  getClipsLiveFailed,
  postClipsBookmarksSuccess,
  postClipsBookmarksFailed,
  deleteClipsBookmarksSuccess,
  deleteClipsBookmarksFailed,
  getClipByIdSuccess,
  getClipByIdFailed,
  showLoader,
  hideLoader
} from '../actions';
import urlUtil from '../util/urlUtil';
import errorUtil from '../util/errorUtil';

const getClipsLatestCall = async () =>
  await GET(`/api/clips/clips/latest`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Standalone-Application': 'seriea'
    }
  })
    .then(response => response)
    .catch(error => error.response);

const getClipsCall = async url =>
  await GET(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Standalone-Application': 'seriea'
    }
  })
    .then(response => response)
    .catch(error => error.response);

const getSimilarClipsCall = async url =>
  await GET(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Standalone-Application': 'seriea'
    }
  })
    .then(response => response)
    .catch(error => error.response);

function* getClipsLatestRequest() {
  try {
    const clips_latest = yield call(getClipsLatestCall);
    if (clips_latest.status >= 200 && clips_latest.status < 400) {
      yield put(getClipsLatestSuccess(clips_latest.data.results));
    } else {
      yield put(getClipsLatestFailed(clips_latest.data));
    }
  } catch (error) {
    yield put(getClipsLatestFailed(error));
  }
}

function* getClipsRequest({ params }) {
  let url = `/api/clips/clips`;
  if (params) {
    const { league_id, cursor, limit } = params;
    url = `/api/clips/clips?league_id=${league_id}${
      cursor ? `&cursor=${cursor}` : ''
    }${limit ? `&limit=${limit}` : ''}`;
  }
  try {
    const clips_all = yield call(getClipsCall, url);
    if (clips_all.status >= 200 && clips_all.status < 400) {
      yield put(getClipsSuccess(clips_all.data));
    } else {
      yield put(getClipsFailed(clips_all.data));
    }
  } catch (error) {
    yield put(getClipsFailed(error));
  }
}

function* getGamesScheduleRequest({ params }) {
  try {
    const response = yield queryGETWithToken(
      urlUtil.getGamesScheduleUrl(params)
    );

    yield put(getGamesScheduleSuccess(response.data.results));
  } catch ({ response }) {
    yield put(getGamesScheduleFailed(response));
  }
}

function* getSimilarClipsRequest({ params }) {
  const { clip_id, interval } = params;
  let url = `/api/clips/clips/${clip_id}/similar_clips`;
  if (interval) {
    url = `/api/clips/clips/${clip_id}/similar_clips?interval=${interval}`;
  }
  try {
    const clips_all = yield call(getSimilarClipsCall, url);
    if (clips_all.status >= 200 && clips_all.status < 400) {
      yield put(getSimilarClipsSuccess(clips_all.data.results));
    } else {
      yield put(getSimilarClipsFailed(clips_all.data));
    }
  } catch (error) {
    yield put(getSimilarClipsFailed(error));
  }
}

function* getClipsBookmarksRequest({ params }) {
  const { cursor } = params;
  try {
    const response = yield queryGETWithToken(
      `/api/clips/bookmarks?cursor=${cursor}`
    );

    yield put(getClipsBookmarksSuccess(response.data));
  } catch ({ response }) {
    yield put(getClipsBookmarksFailed(response));
  }
}

function* getClipsSearchesRequest() {
  try {
    const response = yield queryGETWithToken(`/api/clips/searches`);

    yield put(getClipsSearchesSuccess(response.data.results));
  } catch ({ response }) {
    yield put(getClipsSearchesFailed(response));
  }
}

function* getClipsLiveRequest({ params }) {
  const cursor = params ? params.cursor : '';
  try {
    const response = yield queryGETWithToken(
      `/api/clips/clips/live?cursor=${cursor}`
    );

    yield put(getClipsLiveSuccess(response.data));
  } catch ({ response }) {
    yield put(getClipsLiveFailed(response));
  }
}

function* postClipsBookmarksRequest({ body }) {
  yield put(showLoader());
  try {
    const response = yield queryPOSTWithToken('/api/clips/bookmarks', body);

    if (response.data) {
      const clipId = response.data.clip_id;
      yield put(postClipsBookmarksSuccess(response.data));
      yield put(hideLoader());

      toast.success('Video successfully bookmarked', {
        toastId: clipId
      });
    }
  } catch (error) {
    const { errors } = error.response.data;

    errorUtil.showErrorFromArray(errors);
    yield put(hideLoader());
    yield put(postClipsBookmarksFailed(errors));
  }
}

function* deleteClipsBookmarksRequest({ clip_id }) {
  const clipsState = state => state.clips;

  yield put(showLoader());
  try {
    const response = yield queryDELETEWithToken(
      `/api/clips/bookmarks/users/me/clips/${clip_id}`
    );

    const { clipsBookmarks } = yield select(clipsState);

    if (response.status === 204) {
      const newBookmarks = clipsBookmarks.filter(
        clip => clip.clip_id !== clip_id
      );
      yield put(deleteClipsBookmarksSuccess(newBookmarks));
      yield put(hideLoader());

      toast.success('Bookmark successfully deleted', {
        toastId: clip_id
      });
    }
  } catch (error) {
    const { errors } = error.response.data;

    errorUtil.showErrorFromArray(errors);
    yield put(hideLoader());
    yield put(deleteClipsBookmarksFailed(errors));
  }
}

function* getClipByIdRequest({ clip_id }) {
  try {
    const response = yield queryGETWithToken(`/api/clips/clips/${clip_id}`);

    yield put(getClipByIdSuccess(response.data));
  } catch ({ response }) {
    yield put(getClipByIdFailed(response));
  }
}

export function* getClipsLatest() {
  yield takeEvery(GET_CLIPS_LATEST, getClipsLatestRequest);
}

export function* getClips() {
  yield takeEvery(GET_CLIPS, getClipsRequest);
}

export function* getGamesSchedule() {
  yield takeEvery(GET_GAMES_SCHEDULE, getGamesScheduleRequest);
}

export function* getSimilarClips() {
  yield takeEvery(GET_SIMILAR_CLIPS, getSimilarClipsRequest);
}

export function* getClipsBookmarks() {
  yield takeEvery(GET_CLIPS_BOOKMARKS, getClipsBookmarksRequest);
}

export function* getClipsSearches() {
  yield takeEvery(GET_CLIPS_SEARCHES, getClipsSearchesRequest);
}

export function* getClipsLive() {
  yield takeEvery(GET_CLIPS_LIVE, getClipsLiveRequest);
}

export function* postClipsBookmarks() {
  yield takeEvery(POST_CLIPS_BOOKMARKS, postClipsBookmarksRequest);
}

export function* deleteClipsBookmarks() {
  yield takeEvery(DELETE_CLIPS_BOOKMARKS, deleteClipsBookmarksRequest);
}

export function* getClipById() {
  yield takeEvery(GET_CLIP_BY_ID, getClipByIdRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getClipsLatest),
    fork(getClips),
    fork(getGamesSchedule),
    fork(getSimilarClips),
    fork(getClipsBookmarks),
    fork(getClipsSearches),
    fork(getClipsLive),
    fork(postClipsBookmarks),
    fork(deleteClipsBookmarks),
    fork(getClipById)
  ]);
}
