import {
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED
} from '../constants/ActionTypes';

export const getPlayers = (leagueId, teamIds) => ({
  type: GET_PLAYERS,
  leagueId,
  teamIds
});

export const getPlayersSuccess = players => ({
  type: GET_PLAYERS_SUCCESS,
  players
});

export const getPlayersFailed = () => ({
  type: GET_PLAYERS_FAILED
});
