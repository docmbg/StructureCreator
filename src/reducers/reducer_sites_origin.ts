import { SET_SITES_ORIGIN } from '../consts';

export default function (state: string = 'local', action: any) {
    switch (action.type) {
        case SET_SITES_ORIGIN:
            return action.payload;
        default:
            return state;
    }
}