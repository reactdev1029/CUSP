import {
  GET_CLIPS_LATEST,
  GET_CLIPS_LATEST_SUCCESS,
  GET_CLIPS_LATEST_FAILED,
  GET_CLIPS,
  GET_CLIPS_SUCCESS,
  GET_CLIPS_FAILED,
  GET_GAMES_SCHEDULE,
  GET_GAMES_SCHEDULE_SUCCESS,
  GET_GAMES_SCHEDULE_FAILED,
  CLIPS_CLEAR,
  GET_PLAY_ID,
  GET_SIMILAR_CLIPS,
  GET_SIMILAR_CLIPS_SUCCESS,
  GET_SIMILAR_CLIPS_FAILED,
  GET_CLIPS_BOOKMARKS,
  GET_CLIPS_BOOKMARKS_SUCCESS,
  GET_CLIPS_BOOKMARKS_FAILED,
  GET_CLIPS_SEARCHES,
  GET_CLIPS_SEARCHES_SUCCESS,
  GET_CLIPS_SEARCHES_FAILED,
  GET_CLIPS_LIVE,
  GET_CLIPS_LIVE_SUCCESS,
  GET_CLIPS_LIVE_FAILED,
  POST_CLIPS_BOOKMARKS,
  POST_CLIPS_BOOKMARKS_SUCCESS,
  POST_CLIPS_BOOKMARKS_FAILED,
  DELETE_CLIPS_BOOKMARKS,
  DELETE_CLIPS_BOOKMARKS_SUCCESS,
  DELETE_CLIPS_BOOKMARKS_FAILED,
  GET_CLIP_BY_ID,
  GET_CLIP_BY_ID_SUCCESS,
  GET_CLIP_BY_ID_FAILED
} from '../constants/ActionTypes';

export const getClipsLatest = () => {
  return {
    type: GET_CLIPS_LATEST
  };
};
export const getClipsLatestSuccess = clips_latest => {
  return {
    type: GET_CLIPS_LATEST_SUCCESS,
    clips_latest
  };
};
export const getClipsLatestFailed = error => {
  return {
    type: GET_CLIPS_LATEST_FAILED,
    error
  };
};
export const getClips = params => {
  return {
    type: GET_CLIPS,
    params
  };
};
export const getClipsSuccess = clips_all => {
  return {
    type: GET_CLIPS_SUCCESS,
    clips_all
  };
};
export const getClipsFailed = error => {
  return {
    type: GET_CLIPS_FAILED,
    error
  };
};
export const getGamesSchedule = params => {
  return {
    type: GET_GAMES_SCHEDULE,
    params
  };
};
export const getGamesScheduleSuccess = games_schedule => {
  return {
    type: GET_GAMES_SCHEDULE_SUCCESS,
    games_schedule
  };
};
export const getGamesScheduleFailed = error => {
  return {
    type: GET_GAMES_SCHEDULE_FAILED,
    error
  };
};
export const clipsClear = () => {
  return {
    type: CLIPS_CLEAR
  };
};
export const getPlayId = play_id => {
  return {
    type: GET_PLAY_ID,
    play_id
  };
};
export const getSimilarClips = params => {
  return {
    type: GET_SIMILAR_CLIPS,
    params
  };
};
export const getSimilarClipsSuccess = similar_clips => {
  return {
    type: GET_SIMILAR_CLIPS_SUCCESS,
    similar_clips
  };
};
export const getSimilarClipsFailed = error => {
  return {
    type: GET_SIMILAR_CLIPS_FAILED,
    error
  };
};
export const getClipsBookmarks = params => {
  return {
    type: GET_CLIPS_BOOKMARKS,
    params
  };
};
export const getClipsBookmarksSuccess = clipsBookmarks => {
  return {
    type: GET_CLIPS_BOOKMARKS_SUCCESS,
    clipsBookmarks
  };
};
export const getClipsBookmarksFailed = error => {
  return {
    type: GET_CLIPS_BOOKMARKS_FAILED,
    error
  };
};
export const getClipsSearches = () => {
  return {
    type: GET_CLIPS_SEARCHES
  };
};
export const getClipsSearchesSuccess = clipsSearches => {
  return {
    type: GET_CLIPS_SEARCHES_SUCCESS,
    clipsSearches
  };
};
export const getClipsSearchesFailed = error => {
  return {
    type: GET_CLIPS_SEARCHES_FAILED,
    error
  };
};
export const getClipsLive = params => {
  return {
    type: GET_CLIPS_LIVE,
    params
  };
};
export const getClipsLiveSuccess = clipsLive => {
  return {
    type: GET_CLIPS_LIVE_SUCCESS,
    clipsLive
  };
};
export const getClipsLiveFailed = error => {
  return {
    type: GET_CLIPS_LIVE_FAILED,
    error
  };
};
export const postClipsBookmarks = body => {
  return {
    type: POST_CLIPS_BOOKMARKS,
    body
  };
};
export const postClipsBookmarksSuccess = postedBookmarks => {
  return {
    type: POST_CLIPS_BOOKMARKS_SUCCESS,
    postedBookmarks
  };
};
export const postClipsBookmarksFailed = error => {
  return {
    type: POST_CLIPS_BOOKMARKS_FAILED,
    error
  };
};
export const deleteClipsBookmarks = clip_id => {
  return {
    type: DELETE_CLIPS_BOOKMARKS,
    clip_id
  };
};
export const deleteClipsBookmarksSuccess = clipsBookmarks => {
  return {
    type: DELETE_CLIPS_BOOKMARKS_SUCCESS,
    clipsBookmarks
  };
};
export const deleteClipsBookmarksFailed = error => {
  return {
    type: DELETE_CLIPS_BOOKMARKS_FAILED,
    error
  };
};
export const getClipById = clip_id => {
  return {
    type: GET_CLIP_BY_ID,
    clip_id
  };
};
export const getClipByIdSuccess = clipById => {
  return {
    type: GET_CLIP_BY_ID_SUCCESS,
    clipById
  };
};
export const getClipByIdFailed = error => {
  return {
    type: GET_CLIP_BY_ID_FAILED,
    error
  };
};
