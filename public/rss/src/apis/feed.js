import jsonp from 'jsonp';
import moment from 'moment';
import {
  DESCRIPTION,
  DESCRIPTION_PARSE,
  MAX_AGE,
  PUB_DATES,
  TITLE,
  TITLE_PARSE,
  URL,
} from '../strings';

const REG = /\?/;
let drift = 0;
const version = Date.now().toString();
const url = REG.test(URL)
? `${URL}&fs-or-version=${version}`
: `${URL}?fs-or-version=${version}`;
// TODO: NEED TO PRE-ENDCODE URL
const TIMEOUT = 10 * 1000;
const RE_DESCRIPTION = new RegExp(DESCRIPTION_PARSE, 'm');
const RE_TITLE = new RegExp(TITLE_PARSE, 'm');
const YQL_ENDPOINT = 'https://query.yahooapis.com/v1/public/yql';
const YQL_SELECT = encodeURIComponent('select pubDate, title, description ');
const YQL_FROM = encodeURIComponent('from rss ');
const YQL_WHERE = encodeURIComponent(`where url="${url}"`);
const YQL_URL = `${YQL_ENDPOINT}?q=${YQL_SELECT}${YQL_FROM}${YQL_WHERE}&format=json`;
window.addEventListener('message', (message) => {
  switch (message.data.type) {
    case 'MSG_TIME':
      if (message.data.value !== undefined) {
        drift = message.data.value;
      }
      break;
    default:
  }
});
// eslint-disable-next-line
export const get = () => {
  window.parent.postMessage({
    type: 'MSG_TIME',
  }, '*');
  if (URL === null) {
    return Promise.reject({
      message: '400',
    });
  }
  return new Promise((resolve, reject) => {
    jsonp(YQL_URL, { timeout: TIMEOUT }, (err, data) => {
      if (err !== null) {
        reject({
          message: '500',
        });
        return;
      }
      if (
        data.query === undefined ||
        data.query.results === undefined
      ) {
        reject({
          message: '400',
        });
        return;
      }
      let items;
      if (data.query.results === null) {
        items = [];
      } else if (!Array.isArray(data.query.results.item)) {
        items = [data.query.results.item];
      } else {
        items = data.query.results.item;
      }
      let maxAgeM = null;
      if (PUB_DATES) {
        maxAgeM = moment(Date.now() - drift).subtract(MAX_AGE, 's');
      }
      let transformed = items.map((o, i) => {
        const value = {
          id: i,
        };
        // TITLE
        if (TITLE && o.title === undefined) return null;
        if (TITLE) {
          let title = o.title;
          const match = RE_TITLE.exec(title);
          if (match === null) return null;
          title = match[1];
          if (title === '') return null;
          value.title = title;
        }
        // DESCRIPTION
        if (DESCRIPTION && o.description === undefined) return null;
        if (DESCRIPTION) {
          let description = o.description;
          const match = RE_DESCRIPTION.exec(description);
          if (match === null) return null;
          description = match[1];
          if (description === '') return null;
          value.description = description;
        }
        // PUB_DATES
        if (PUB_DATES && o.pubDate === undefined) return null;
        const dateM = moment(o.pubDate);
        if (
          PUB_DATES &&
          dateM.isBefore(maxAgeM)
        ) return null;
        if (PUB_DATES) value.pubDate = dateM.valueOf();
        // RETURN
        return value;
      });
      transformed = transformed.filter(o => o !== null);
      if (PUB_DATES) transformed = transformed.sort((a, b) => b.pubDate - a.pubDate);
      resolve(transformed);
    });
  });
};
