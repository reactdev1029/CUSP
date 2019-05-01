import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  CHECK_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED
} from '../constants/ActionTypes';

const INIT_STATE = {
  loader: false,
  authUser: localStorage.getItem('token'),
  error: undefined,
  authStatus: undefined
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_USER: {
      return {
        ...state,
        loader: true,
        error: undefined
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.authUser,
        error: undefined
      };
    }
    case SIGNIN_USER_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error
      };
    }
    case CHECK_USER_SUCCESS: {
      return {
        ...state,
        authStatus: action.authStatus
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        error: undefined
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: null,
        error: undefined
      };
    }
    case SIGNOUT_USER_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error
      };
    }

    default:
      return state;
  }
};
