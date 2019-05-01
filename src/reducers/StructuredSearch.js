import {
  GET_SEARCHED_VIDEOS,
  GET_SEARCHED_VIDEOS_SUCCESS,
  GET_SEARCHED_VIDEOS_FAILED,
  GET_SEARCHED_VIDEOS_NEXT
} from '../constants/ActionTypes';

const INIT_STATE = {
  searchedVideosData: {
    next: '',
    results: []
  },
  loading: true,
  loadingNextVideos: false,
  queryUrl: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SEARCHED_VIDEOS: {
      return {
        ...state,
        queryUrl: action.queryUrl,
        loading: true,
        loadingNextVideos: false
      };
    }
    case GET_SEARCHED_VIDEOS_SUCCESS: {
      return {
        ...state,
        searchedVideosData: action.searchedVideosData,
        queryUrl: action.queryUrl,
        loading: false,
        loadingNextVideos: false
      };
    }
    case GET_SEARCHED_VIDEOS_FAILED: {
      return {
        ...state,
        loading: false,
        loadingNextVideos: false
      };
    }
    case GET_SEARCHED_VIDEOS_NEXT: {
      return {
        ...state,
        queryUrl: action.queryUrl,
        loading: false,
        loadingNextVideos: true
      };
    }

    default:
      return state;
  }
};
