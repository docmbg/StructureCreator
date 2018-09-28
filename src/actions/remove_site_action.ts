import { DELETE_SITE } from '../consts';
import { ISite } from '../api/helperFunctions';

export default function addSite(info: ISite) {
    return {
        type: DELETE_SITE,
        payload: info
    };
}