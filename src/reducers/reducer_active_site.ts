import { SET_ACTIVE_SITE } from '../consts';

export default function (state: string = '', action: any) {
    switch (action.type) {
        case SET_ACTIVE_SITE:
            return action.payload;
        default:
            return state;
    }
}