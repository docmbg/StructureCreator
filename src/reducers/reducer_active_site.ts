import { SET_ACTIVE_SITE } from '../consts';

export default function (state: number = -1, action: any) {
    switch (action.type) {
        case SET_ACTIVE_SITE:
            return isNaN(action.payload) ? null : action.payload;
        default:
            return state;
    }
}