import {
  GET_HUB_POSTS,
  GET_HUB_POSTS_SUCCESS,
  GET_HUB_POSTS_FAILED,
  GET_HUB_POSTS_NEXT
} from '../constants/ActionTypes';

const INIT_STATE = {
  hubPosts: {
    results: []
  },
  communityLoading: true,
  loadingNextPosts: false,
  error: undefined
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HUB_POSTS: {
      return {
        ...state,
        error: undefined
      };
    }
    case GET_HUB_POSTS_SUCCESS: {
      return {
        ...state,
        hubPosts: action.hubPosts,
        communityLoading: false,
        loadingNextPosts: false
      };
    }
    case GET_HUB_POSTS_FAILED: {
      return {
        ...state,
        error: action.error,
        communityLoading: false,
        loadingNextPosts: false
      };
    }
    case GET_HUB_POSTS_NEXT: {
      return {
        ...state,
        cursor: action.cursor,
        loadingNextPosts: true
      };
    }

    default:
      return state;
  }
};
