import {
  GET_SEARCHED_VIDEOS,
  GET_SEARCHED_VIDEOS_SUCCESS,
  GET_SEARCHED_VIDEOS_FAILED,
  GET_SEARCHED_VIDEOS_NEXT,
  SET_SELECTED_FILTERS,
  UNSET_SELECTED_FILTERS
} from '../constants/ActionTypes';

// Set selected filters
export const setFilters = filters => ({
  type: SET_SELECTED_FILTERS,
  filters
});

export const unsetFilters = () => ({
  type: UNSET_SELECTED_FILTERS
});

// Get videos for Search page
export const getSearchedVideos = queryUrl => ({
  type: GET_SEARCHED_VIDEOS,
  queryUrl
});

export const getSearchedVideosSuccess = searchedVideosData => ({
  type: GET_SEARCHED_VIDEOS_SUCCESS,
  searchedVideosData
});

export const getSearchedVideosFailed = () => ({
  type: GET_SEARCHED_VIDEOS_FAILED
});

export const getSearchedVideosNext = queryUrl => ({
  type: GET_SEARCHED_VIDEOS_NEXT,
  queryUrl
});
