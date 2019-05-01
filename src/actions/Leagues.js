import {
  GET_LEAGUES,
  GET_LEAGUES_SUCCESS,
  GET_LEAGUES_FAILED
} from '../constants/ActionTypes';

// Get data for Filters
export const getLeagues = () => ({
  type: GET_LEAGUES
});

export const getLeaguesSuccess = leagues => ({
  type: GET_LEAGUES_SUCCESS,
  leagues
});

export const getLeaguesFailed = () => ({
  type: GET_LEAGUES_FAILED
});
