import { SET_ACTIVE_SITE } from '../consts';

export default function setActiveSite(info: string) {
    return {
        type: SET_ACTIVE_SITE,
        payload: info
    };
}