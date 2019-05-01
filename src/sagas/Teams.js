import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_TEAMS } from '../constants/ActionTypes';
import { queryGETWithToken } from '../util/requests2';
import { getTeamsSuccess, getTeamsFailed } from '../actions';
import { transformForDropdown } from '../util/dropdown-helper';

function* getAllTeamsMethod({ leagueId = '' }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/filters/teams/suggestions?league_id=${leagueId}`
    );

    if (response.data) {
      const teams = transformForDropdown(response.data.results);

      yield put(getTeamsSuccess(teams));
    }
  } catch (error) {
    yield put(getTeamsFailed(error));
  }
}

export function* getAllTeams() {
  yield takeEvery(GET_TEAMS, getAllTeamsMethod);
}

export default function* rootSaga() {
  yield all([fork(getAllTeams)]);
}
