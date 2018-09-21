import { EDIT_SITE } from '../consts';
import { ISite } from '../api/helperFunctions';

export default function editSite(info: ISite) {
    return {
        type: EDIT_SITE,
        payload: info
    };
}