import { ADD_SITE } from '../consts';
import { ISite } from '../api/helperFunctions';

export default function addSite(info: ISite) {
    return {
        type: ADD_SITE,
        payload: info
    };
}