import { all, fork, put, select, takeEvery } from 'redux-saga/effects';
import { queryGETWithToken } from '../util/requests2';
import { GET_HUB_POSTS, GET_HUB_POSTS_NEXT } from '../constants/ActionTypes';
import { getHubPostsSuccess, getHubPostsFailed } from '../actions';

function* getHubPostsRequest() {
  try {
    const response = yield queryGETWithToken(
      `/api/community/232eff7b-d12f-4e12-ae55-09f422ded2e0/posts?filter=post_type&post_type=video&author_id=${localStorage.getItem(
        'user_id'
      )}`
    );

    yield put(getHubPostsSuccess(response.data));
  } catch ({ response }) {
    yield put(getHubPostsFailed(response));
  }
}

function* getHubPostsNextRequest({ cursor }) {
  const prevPostsState = state => state.community;

  try {
    const response = yield queryGETWithToken(
      `/api/community/232eff7b-d12f-4e12-ae55-09f422ded2e0/posts?filter=post_type&post_type=video&author_id=${localStorage.getItem(
        'user_id'
      )}&cursor=${cursor}`
    );
    const { hubPosts } = yield select(prevPostsState);
    let postsData = response.data;
    if (hubPosts.results.length) {
      postsData = {
        ...postsData,
        results: [...hubPosts.results, ...postsData.results]
      };
    }

    yield put(getHubPostsSuccess(postsData));
  } catch ({ response }) {
    yield put(getHubPostsFailed(response));
  }
}

export function* getHubPosts() {
  yield takeEvery(GET_HUB_POSTS, getHubPostsRequest);
}

export function* getHubPostsNext() {
  yield takeEvery(GET_HUB_POSTS_NEXT, getHubPostsNextRequest);
}

export default function* rootSaga() {
  yield all([fork(getHubPosts), fork(getHubPostsNext)]);
}
