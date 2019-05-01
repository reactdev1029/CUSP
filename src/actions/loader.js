import { LOADER_SHOW, LOADER_HIDE } from '../constants/ActionTypes';

export const showLoader = () => ({
  type: LOADER_SHOW
});

export const hideLoader = () => ({
  type: LOADER_HIDE
});
