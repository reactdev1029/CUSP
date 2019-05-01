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

const INIT_STATE = {
  clips_loader: false,
  clips_latest: undefined,
  clips_error: undefined,
  clips_all: undefined,
  clips_all_array: [],
  games_schedule: undefined,
  play_id: undefined,
  similar_clips: undefined,
  clipsBookmarks: [],
  bookmarks_cursor: undefined,
  clipsSearches: [],
  clipsLive: undefined,
  postedBookmarks: undefined,
  clipById: undefined
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIPS_LATEST: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined,
        clips_all: undefined
      };
    }
    case GET_CLIPS_LATEST_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clips_latest: action.clips_latest,
        clips_error: undefined
      };
    }
    case GET_CLIPS_LATEST_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_CLIPS: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_CLIPS_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clips_all: action.clips_all,
        clips_all_array: state.clips_all_array.concat(action.clips_all.results),
        clips_error: undefined
      };
    }
    case GET_CLIPS_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_GAMES_SCHEDULE: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_GAMES_SCHEDULE_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        games_schedule: action.games_schedule,
        clips_error: undefined
      };
    }
    case GET_GAMES_SCHEDULE_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case CLIPS_CLEAR: {
      return {
        ...state,
        clips_error: undefined,
        clips_all_array: [],
        clipsBookmarks: [],
        bookmarks_cursor: undefined
      };
    }
    case GET_PLAY_ID: {
      return {
        ...state,
        play_id: action.play_id
      };
    }
    case GET_SIMILAR_CLIPS: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined,
        similar_clips: undefined
      };
    }
    case GET_SIMILAR_CLIPS_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        similar_clips: action.similar_clips,
        clips_error: undefined
      };
    }
    case GET_SIMILAR_CLIPS_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_CLIPS_BOOKMARKS: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_CLIPS_BOOKMARKS_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        bookmarks_cursor: action.clipsBookmarks.next,
        clipsBookmarks: state.clipsBookmarks.concat(
          action.clipsBookmarks.results
        ),
        clips_error: undefined
      };
    }
    case GET_CLIPS_BOOKMARKS_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_CLIPS_SEARCHES: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_CLIPS_SEARCHES_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clipsSearches: action.clipsSearches,
        clips_error: undefined
      };
    }
    case GET_CLIPS_SEARCHES_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_CLIPS_LIVE: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_CLIPS_LIVE_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clipsLive: action.clipsLive,
        clips_all_array: state.clips_all_array.concat(action.clipsLive.results),
        clips_error: undefined
      };
    }
    case GET_CLIPS_LIVE_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case POST_CLIPS_BOOKMARKS: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined,
        postedBookmarks: undefined
      };
    }
    case POST_CLIPS_BOOKMARKS_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        postedBookmarks: action.postedBookmarks,
        clips_error: undefined
      };
    }
    case POST_CLIPS_BOOKMARKS_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case DELETE_CLIPS_BOOKMARKS: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case DELETE_CLIPS_BOOKMARKS_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clipsBookmarks: action.clipsBookmarks,
        clips_error: undefined
      };
    }
    case DELETE_CLIPS_BOOKMARKS_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }
    case GET_CLIP_BY_ID: {
      return {
        ...state,
        clips_loader: true,
        clips_error: undefined
      };
    }
    case GET_CLIP_BY_ID_SUCCESS: {
      return {
        ...state,
        clips_loader: false,
        clipById: action.clipById,
        clips_error: undefined
      };
    }
    case GET_CLIP_BY_ID_FAILED: {
      return {
        ...state,
        clips_loader: false,
        clips_error: action.error
      };
    }

    default:
      return state;
  }
};
