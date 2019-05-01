import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_LEAGUES } from '../constants/ActionTypes';
import { queryGETWithToken } from '../util/requests2';
import { getLeaguesSuccess, getLeaguesFailed } from '../actions';
import { transformForDropdown } from '../util/dropdown-helper';

function* getAllLeaguesMethod() {
  try {
    const response = yield queryGETWithToken(
      '/api/clips/filters/leagues/suggestions'
    );

    if (response.data) {
      const leagues = transformForDropdown(response.data.results);

      yield put(getLeaguesSuccess(leagues));
    }
  } catch (error) {
    yield put(getLeaguesFailed(error));
  }
}

export function* getAllLeagues() {
  yield takeEvery(GET_LEAGUES, getAllLeaguesMethod);
}

export default function* rootSaga() {
  yield all([fork(getAllLeagues)]);
}
