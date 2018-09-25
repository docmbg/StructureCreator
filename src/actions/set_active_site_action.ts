import { SET_ACTIVE_SITE } from '../consts';

export default function setActiveSite(id: string) {
    return {
        type: SET_ACTIVE_SITE,
        payload: id
    };
}