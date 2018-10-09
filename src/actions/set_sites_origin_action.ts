import { SET_SITES_ORIGIN } from '../consts';

export default function setSitesOrigin(info: string) {
    return {
        type: SET_SITES_ORIGIN,
        payload: info
    };
}