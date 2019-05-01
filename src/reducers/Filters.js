import {
  GET_LEAGUES,
  GET_LEAGUES_SUCCESS,
  GET_LEAGUES_FAILED,
  GET_TEAMS,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILED,
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED,
  GET_ACTION_TYPES,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_FAILED,
  SET_SELECTED_FILTERS,
  UNSET_SELECTED_FILTERS
} from '../constants/ActionTypes';

const INIT_STATE = {
  actionTypes: [],
  actionTypesLoading: true,
  players: [],
  playersLoading: true,
  games: [],
  gamesLoading: true,
  teams: [],
  teamsLoading: true,
  teamIds: '',
  leagues: [],
  leaguesLoading: true,
  leagueId: '',
  filters: {
    league: [],
    team: [],
    game: [],
    player: [],
    action_type: [],
    startDate: null,
    endDate: null,
    clipType: '',
    rating: 0
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEAGUES: {
      return {
        ...state
      };
    }
    case GET_LEAGUES_SUCCESS: {
      return {
        ...state,
        leagues: action.leagues,
        leaguesLoading: false
      };
    }
    case GET_LEAGUES_FAILED: {
      return {
        ...state,
        leaguesLoading: false
      };
    }
    case GET_TEAMS: {
      return {
        ...state,
        leagueId: action.leagueId,
        teamsLoading: true
      };
    }
    case GET_TEAMS_SUCCESS: {
      return {
        ...state,
        teams: action.teams,
        teamsLoading: false
      };
    }
    case GET_TEAMS_FAILED: {
      return {
        ...state,
        teamsLoading: false
      };
    }
    case GET_GAMES: {
      return {
        ...state,
        leagueId: action.leagueId,
        teamIds: action.teamIds,
        gamesLoading: true
      };
    }
    case GET_GAMES_SUCCESS: {
      return {
        ...state,
        games: action.games,
        gamesLoading: false
      };
    }
    case GET_GAMES_FAILED: {
      return {
        ...state,
        gamesLoading: false
      };
    }
    case GET_PLAYERS: {
      return {
        ...state,
        leagueId: action.leagueId,
        teamIds: action.teamIds,
        playersLoading: true
      };
    }
    case GET_PLAYERS_SUCCESS: {
      return {
        ...state,
        players: action.players,
        playersLoading: false
      };
    }
    case GET_PLAYERS_FAILED: {
      return {
        ...state,
        playersLoading: false
      };
    }
    case GET_ACTION_TYPES: {
      return {
        ...state,
        leagueId: action.leagueId,
        actionTypesLoading: true
      };
    }
    case GET_ACTION_TYPES_SUCCESS: {
      return {
        ...state,
        actionTypes: action.actionTypes,
        actionTypesLoading: false
      };
    }
    case GET_ACTION_TYPES_FAILED: {
      return {
        ...state,
        actionTypesLoading: false
      };
    }
    case SET_SELECTED_FILTERS: {
      return {
        ...state,
        filters: action.filters
      };
    }
    case UNSET_SELECTED_FILTERS: {
      return {
        ...state,
        filters: INIT_STATE.filters,
        leagueId: ''
      };
    }

    default:
      return state;
  }
};
