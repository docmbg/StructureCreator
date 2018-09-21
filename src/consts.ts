// import { getMainUrl } from './api/helperFunctions';

export const ADD_SITE = 'ADD_SITE';
export const SET_ACTIVE_SITE = 'SET_ACTIVE_SITE';
export const EDIT_SITE = 'EDIT_SITE';
export const REMOVE_SITE = 'REMOVE_SITE';

export const readOptions = {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose',
        'Access-Control-Allow-Origin': '*'
    }
};

export const postOptions = {
    method: 'POST', // or 'PUT'
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose'
    }
};

// export const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
// export const siteUrl = getMainUrl(paramUrl);