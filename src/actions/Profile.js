import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED
} from '../constants/ActionTypes';

export const getUserProfile = () => ({
  type: GET_USER_PROFILE
});

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  userProfile
});

export const getUserProfileFailed = error => ({
  type: GET_USER_PROFILE_FAILED,
  error
});
