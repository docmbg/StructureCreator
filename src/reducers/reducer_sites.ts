import undoable, { includeAction } from 'redux-undo';
import { ADD_SITE, EDIT_SITE, DELETE_SITE, SET_SITES } from '../consts';
import { ISite } from '../api/helperFunctions';

interface ISiteAction {
    type: string;
    payload: ISite;
}

export interface ISitesState {
    byId: Array<number>;
    byHash: any;
}

function sites(state: ISitesState = { byId: [], byHash: {} }, action: ISiteAction) {
    let newState;
    let compareUrl;
    switch (action.type) {
        case ADD_SITE:
            return Object.assign({}, state, {
                byId: [...state.byId, action.payload.Id],
                byHash: {
                    ...state.byHash,
                    [action.payload.Id]: action.payload
                }
            });
        case EDIT_SITE:
            newState = Object.assign({}, {
                byId: [...state.byId],
                byHash: {
                    ...state.byHash
                }
            });
            compareUrl = newState.byHash[action.payload.Id].info.Url;
            for (let key of Object.keys(newState.byHash)) {      
                if (newState.byHash[key].info.Url.includes(compareUrl)) {
                    newState.byHash[key].info.Url = newState.byHash[key].info.Url.replace(
                        compareUrl,
                        action.payload.info.Url
                    );
                }
            }
            newState.byHash[action.payload.Id] = action.payload;
            return newState;

        case DELETE_SITE:
            // delete sites which parent site is this id as well
            newState = Object.assign({}, {
                byId: [...state.byId],
                byHash: {
                    ...state.byHash
                }
            });
            let indexes: Array<number> = [];
            compareUrl = newState.byHash[action.payload.Id].info.Url;
            for (let key of Object.keys(newState.byHash)) {                
                if (newState.byHash[key].info.Url.includes(compareUrl)) {
                    indexes.push(newState.byHash[key].Id);
                    delete newState.byHash[key];
                }
            }
            newState.byId = state.byId.filter((e: number) => !indexes.includes(e));
            return newState;
        case SET_SITES:
            console.log(action.payload);
            return action.payload;

        default:
            return state;
    }
}

const undoableSites = undoable(sites, {
    filter: includeAction([ADD_SITE, EDIT_SITE, DELETE_SITE, SET_SITES]),
});

export default undoableSites;
