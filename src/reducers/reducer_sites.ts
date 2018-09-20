import { ADD_SITE } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    switch (action.type) {
        case ADD_SITE:
            return [action.payload, ...state];
        default:
            return state;
    }
}