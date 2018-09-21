import { ADD_SITE, EDIT_SITE, REMOVE_SITE } from '../consts';
import { ISite } from '../api/helperFunctions';

interface ISiteAction {
    type: string;
    payload: ISite;
}

export interface ISitesState {
    byTitle: Array<String>;
    byHash: Object;
}

export default function (state: ISitesState = { byTitle: [], byHash: {} }, action: ISiteAction) {
    switch (action.type) {
        case ADD_SITE:
            return {
                byTitle: [...state.byTitle, action.payload.info.Title],
                byHash: {
                    ...state.byHash,
                    [action.payload.info.Title]: action.payload
                }
            };
        case EDIT_SITE:
            state.byHash[action.payload.info.Title] = action.payload;
            return {
                byTitle: [...state.byTitle],
                byHash: {
                    ...state.byHash
                }
            };

        case REMOVE_SITE:
            state.byTitle.filter((e: string) => e !== action.payload.info.Title);
            delete state.byHash[action.payload.info.Title];
            return {
                byTitle: [...state.byTitle],
                byHash: {
                    ...state.byHash
                }
            };
        default:
            return state;
    }
}