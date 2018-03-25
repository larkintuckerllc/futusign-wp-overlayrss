import { parseQueryString } from './util/misc';

const { position } = parseQueryString();
export const POSITION = position !== undefined ? position : 'lower';
export const SITE_URL = window.siteUrl;
export const ACTION_PREFIX = 'app/';
export const ID = window.fsOrID;
