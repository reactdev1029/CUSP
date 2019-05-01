import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_ACTION_TYPES, GET_PLAYERS } from '../constants/ActionTypes';
import { queryGETWithToken } from '../util/requests2';
import {
  getPlayersSuccess,
  getPlayersFailed,
  getActionTypesSuccess,
  getActionTypesFailed
} from '../actions';
import { transformForDropdown } from '../util/dropdown-helper';

function* getAllPlayersMethod({ leagueId = '', teamIds = '' }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/filters/players/suggestions?league_id=${leagueId}&team_ids=${teamIds}`
    );

    if (response.data) {
      const players = transformForDropdown(response.data.results);

      yield put(getPlayersSuccess(players));
    }
  } catch (error) {
    yield put(getPlayersFailed(error));
  }
}

function* getAllActionTypesMethod({ leagueId = '' }) {
  try {
    const response = yield queryGETWithToken(
      `/api/clips/filters/action_types/suggestions?league_id=${leagueId}`
    );

    if (response.data) {
      const actionTypes = transformForDropdown(response.data.results);

      yield put(getActionTypesSuccess(actionTypes));
    }
  } catch (error) {
    yield put(getActionTypesFailed(error));
  }
}

export function* getAllPlayers() {
  yield takeEvery(GET_PLAYERS, getAllPlayersMethod);
}

export function* getAllActionTypes() {
  yield takeEvery(GET_ACTION_TYPES, getAllActionTypesMethod);
}

export default function* rootSaga() {
  yield all([fork(getAllPlayers), fork(getAllActionTypes)]);
}
