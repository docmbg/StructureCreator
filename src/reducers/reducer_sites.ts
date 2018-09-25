import { ADD_SITE, EDIT_SITE, REMOVE_SITE } from '../consts';
import { ISite } from '../api/helperFunctions';

interface ISiteAction {
    type: string;
    payload: ISite;
}

export interface ISitesState {
    byId: Array<number>;
    byHash: Object;
}

export default function (state: ISitesState = { byId: [], byHash: {} }, action: ISiteAction) {
    switch (action.type) {
        case ADD_SITE:
            return {
                byId: [...state.byId, action.payload.Id],
                byHash: {
                    ...state.byHash,
                    [action.payload.Id]: action.payload
                }
            };
        case EDIT_SITE:
            state.byHash[action.payload.Id] = action.payload;
            return {
                byId: [...state.byId],
                byHash: {
                    ...state.byHash
                }
            };

        case REMOVE_SITE:
            state.byId.filter((e: number) => e !== action.payload.Id);
            delete state.byHash[action.payload.Id];
            return {
                byId: [...state.byId],
                byHash: {
                    ...state.byHash
                }
            };
        default:
            return state;
    }
}