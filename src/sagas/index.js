import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import clipsSagas from './Clips';
import filtersSagas from './Filters';
import leaguesSagas from './Leagues';
import teamsSagas from './Teams';
import gamesSagas from './Games';
import StructuredSearch from './StructuredSearch';
import Profile from './Profile';
import Community from './Community';
import Shares from './Shares';

export default function* rootSaga() {
  yield all([
    authSagas(),
    clipsSagas(),
    filtersSagas(),
    StructuredSearch(),
    Profile(),
    leaguesSagas(),
    teamsSagas(),
    gamesSagas(),
    Community(),
    Shares()
  ]);
}
