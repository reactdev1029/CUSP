import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED
} from '../constants/ActionTypes';

const INIT_STATE = {
  userProfile: undefined,
  profileLoading: true,
  error: undefined
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE: {
      return {
        ...state,
        error: undefined
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: action.userProfile,
        profileLoading: false
      };
    }
    case GET_USER_PROFILE_FAILED: {
      return {
        ...state,
        error: action.error,
        profileLoading: false
      };
    }

    default:
      return state;
  }
};
