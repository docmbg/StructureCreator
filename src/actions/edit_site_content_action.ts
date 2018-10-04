import { SET_EDIT_SITE_CONTENT } from '../consts';
import { ISite } from '../api/helperFunctions';

export default function setActiveSite(info: ISite) {
    return {
        type: SET_EDIT_SITE_CONTENT,
        payload: info
    };
}