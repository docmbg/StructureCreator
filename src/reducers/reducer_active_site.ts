import { SET_ACTIVE_SITE } from '../consts';

export default function (state: number = 0, action: any) {
    switch (action.type) {
        case SET_ACTIVE_SITE:
            return action.payload;
        default:
            return state;
    }
}