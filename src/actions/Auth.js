import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  CHECK_USER,
  CHECK_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED
} from '../constants/ActionTypes';

export const userSignIn = data => {
  return {
    type: SIGNIN_USER,
    data
  };
};
export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    authUser
  };
};
export const userSignInFailed = error => {
  return {
    type: SIGNIN_USER_FAILED,
    error
  };
};
export const checkUser = () => {
  return {
    type: CHECK_USER
  };
};
export const checkUserSuccess = authStatus => {
  return {
    type: CHECK_USER_SUCCESS,
    authStatus
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS
  };
};
export const userSignOutFailed = error => {
  return {
    type: SIGNOUT_USER_FAILED,
    error
  };
};
