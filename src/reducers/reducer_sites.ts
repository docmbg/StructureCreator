import { ADD_SITE, EDIT_SITE, DELETE_SITE, SET_SITES } from '../consts';
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

        case DELETE_SITE:
            // delete sites which parent site is this id as well
            let indexes: Array<number>;
            for (let key in state.byHash) {
                if (state.byHash[key].Id === action.payload.Id ||
                    state.byHash[key].parentSite === action.payload.Id
                ) {
                    indexes.push(action.payload.Id);
                    delete state.byHash[action.payload.Id];
                }
            }
            state.byId.filter((e: number) => !indexes.includes(e));
            return {
                byId: [...state.byId],
                byHash: {
                    ...state.byHash
                }
            };
        case SET_SITES:
            console.log(action.payload);
            return action.payload;

        default:
            return state;
    }
}