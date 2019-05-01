import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Auth from './Auth';
import Clips from './Clips';
import Loader from './loader';
import Filters from './Filters';
import StructuredSearch from './StructuredSearch';
import Profile from './Profile';
import Community from './Community';
import Shares from './Shares';

const reducers = combineReducers({
  routing: routerReducer,
  auth: Auth,
  clips: Clips,
  loader: Loader,
  filters: Filters,
  structuredSearch: StructuredSearch,
  profile: Profile,
  community: Community,
  shares: Shares
});

export default reducers;
