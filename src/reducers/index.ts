import { combineReducers } from 'redux';
import SitesReducer from './reducer_sites';
import ActiveSiteReducer from './reducer_active_site';

const rootReducer: any = combineReducers({
   sites: SitesReducer,
   activeSite: ActiveSiteReducer,
});

export default rootReducer;
