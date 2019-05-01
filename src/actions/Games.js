import {
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILED
} from '../constants/ActionTypes';

export const getGames = (leagueId, teamIds) => ({
  type: GET_GAMES,
  leagueId,
  teamIds
});

export const getGamesSuccess = games => ({
  type: GET_GAMES_SUCCESS,
  games
});

export const getGamesFailed = () => ({
  type: GET_GAMES_FAILED
});
