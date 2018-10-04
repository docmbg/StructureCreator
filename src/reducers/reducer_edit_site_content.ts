import { SET_EDIT_SITE_CONTENT } from '../consts';
// import { ISite } from '../api/helperFunctions';

export default function (state: any = {}, action: any) {
    switch (action.type) {
        case SET_EDIT_SITE_CONTENT:
            return action.payload;
        default:
            return state;
    }
}