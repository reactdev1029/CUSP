import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_GAMES } from '../constants/ActionTypes';
import { queryGETWithToken } from '../util/requests2';
import { getGamesSuccess, getGamesFailed } from '../actions';
import { transformForDropdown } from '../util/dropdown-helper';

function* getAllGamesMethod({ leagueId = '', teamIds = '' }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/filters/games/suggestions?league_id=${leagueId}&team_ids=${teamIds}`
    );

    if (response.data) {
      const games = transformForDropdown(response.data.results);

      yield put(getGamesSuccess(games));
    }
  } catch (error) {
    yield put(getGamesFailed(error));
  }
}

export function* getAllGames() {
  yield takeEvery(GET_GAMES, getAllGamesMethod);
}

export default function* rootSaga() {
  yield all([fork(getAllGames)]);
}
