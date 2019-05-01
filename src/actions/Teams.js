import {
  GET_TEAMS,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED
} from '../constants/ActionTypes';

export const getTeams = leagueId => ({
  type: GET_TEAMS,
  leagueId
});

export const getTeamsSuccess = teams => ({
  type: GET_TEAMS_SUCCESS,
  teams
});

export const getTeamsFailed = () => ({
  type: GET_TEAMS_FAILED
});
