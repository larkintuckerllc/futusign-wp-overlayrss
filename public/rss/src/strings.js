import { parseQueryString } from './util/misc';

const { position } = parseQueryString();
export const ACTION_PREFIX = 'app/';
export const URL = window.fsOrURL;
export const CYCLING = window.fsOrCycling;
export const POLLING = window.fsOrPolling;
export const SIZE = window.fsOrSize;
export const LIGHT = window.fsOrTheme === 'light';
export const POSITION = position !== undefined ? position : 'lower';
export const LIMIT_ITEMS = window.fsOrLimitItems;
export const MAX_ITEMS = window.fsOrMaximumItems;
export const PUB_DATES = window.fsOrPublicationDates;
export const MAX_AGE = window.fsOrMaximumAge;
export const PARSE = window.fsOrParse;
