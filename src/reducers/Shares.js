import {
  SHARE_TO_CUSP,
  SHARE_TO_CUSP_SUCCESS,
  SHARE_TO_CUSP_FAILED,
  GET_SHARE,
  GET_SHARE_SUCCESS,
  GET_SHARE_FAILED, GET_SHARE_LOOP
} from '../constants/ActionTypes';

const INIT_STATE = {
  shareData: {},
  shareId: undefined,
  shareState: null,
  number: 0
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHARE_TO_CUSP: {
      return {
        ...state,
        shareData: action.shareData
      };
    }
    case SHARE_TO_CUSP_SUCCESS: {
      return {
        ...state,
        shareId: action.shareId,
        shareData: {}
      };
    }
    case SHARE_TO_CUSP_FAILED: {
      return {
        ...state,
        shareData: {}
      };
    }
    case GET_SHARE: {
      return {
        ...state,
        shareId: action.shareId
      };
    }
    case GET_SHARE_FAILED: {
      return {
        ...state,
        shareId: '',
        shareState: ''
      };
    }
    case GET_SHARE_SUCCESS: {
      return {
        ...state,
        shareId: action.shareId,
        shareState: action.shareState,
        number: state.number + 1
      };
    }
    case GET_SHARE_LOOP: {
      return state;
    }

    default:
      return state;
  }
};
