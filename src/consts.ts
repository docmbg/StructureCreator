import { getMainUrl } from './api/helperFunctions';

export const ADD_SITE = 'ADD_SITE';
export const SET_ACTIVE_SITE = 'SET_ACTIVE_SITE';
export const EDIT_SITE = 'EDIT_SITE';
export const DELETE_SITE = 'DELETE_SITE';
export const SET_SITES = 'SET_SITES';
export const SET_EDIT_SITE_CONTENT = 'SET_EDIT_SITE_CONTENT';
export const SET_SITES_ORIGIN = 'SET_SITES_ORIGIN';

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

export const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
export const siteUrl = getMainUrl(paramUrl);