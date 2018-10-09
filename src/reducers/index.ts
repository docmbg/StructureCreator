import { combineReducers } from 'redux';
import SitesReducer from './reducer_sites';
import ActiveSiteReducer from './reducer_active_site';
import EditSiteContentReducer from './reducer_edit_site_content';
import SitesOriginReducer from './reducer_sites_origin';

const rootReducer: any = combineReducers({
   sites: SitesReducer,
   activeSite: ActiveSiteReducer,
   contentActiveSite: EditSiteContentReducer,
   sitesOrigin: SitesOriginReducer
});

export default rootReducer;
