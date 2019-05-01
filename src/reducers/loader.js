import { LOADER_SHOW, LOADER_HIDE } from '../constants/ActionTypes';

const INITIAL_STATE = { loaderCounter: 0 };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADER_SHOW:
      return {
        ...state,
        loaderCounter: state.loaderCounter + 1
      };
    case LOADER_HIDE:
      return {
        ...state,
        loaderCounter: state.loaderCounter - 1
      };
    default:
      return state;
  }
}
