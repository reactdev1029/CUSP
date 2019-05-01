import {
  GET_ACTION_TYPES,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_FAILED
} from '../constants/ActionTypes';

export const getActionTypes = leagueId => ({
  type: GET_ACTION_TYPES,
  leagueId
});

export const getActionTypesSuccess = actionTypes => ({
  type: GET_ACTION_TYPES_SUCCESS,
  actionTypes
});

export const getActionTypesFailed = () => ({
  type: GET_ACTION_TYPES_FAILED
});
