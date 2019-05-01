import {
  SHARE_TO_CUSP,
  SHARE_TO_CUSP_SUCCESS,
  SHARE_TO_CUSP_FAILED,
  GET_SHARE,
  GET_SHARE_SUCCESS,
  GET_SHARE_FAILED,
  GET_SHARE_LOOP
} from '../constants/ActionTypes';

export const shareToCusp = shareData => ({
  type: SHARE_TO_CUSP,
  shareData
});

export const shareToCuspSuccess = shareId => ({
  type: SHARE_TO_CUSP_SUCCESS,
  shareId
});

export const shareToCuspFailed = () => ({
  type: SHARE_TO_CUSP_FAILED
});

export const getShare = shareId => ({
  type: GET_SHARE,
  shareId
});

export const getShareLoop = () => ({
  type: GET_SHARE_LOOP
});

export const getShareSuccess = ({ shareId, shareState }) => ({
  type: GET_SHARE_SUCCESS,
  shareId,
  shareState
});

export const getShareFailed = () => ({
  type: GET_SHARE_FAILED
});
