import { SET_SITES } from '../consts';

export default function addSite(info: any) {
    return {
        type: SET_SITES,
        payload: info
    };
}
