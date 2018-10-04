import { combineReducers } from 'redux';
import SitesReducer from './reducer_sites';
import ActiveSiteReducer from './reducer_active_site';
import EditSiteContentReducer from './reducer_edit_site_content';

const rootReducer: any = combineReducers({
   sites: SitesReducer,
   activeSite: ActiveSiteReducer,
   contentActiveSite: EditSiteContentReducer
});

export default rootReducer;
