import jsonp from 'jsonp';
import moment from 'moment';
import { MAX_AGE, PARSE, PUB_DATES, URL } from '../strings';

const TIMEOUT = 10 * 1000;
const RE = new RegExp(PARSE, 'm');
const YQL_ENDPOINT = 'https://query.yahooapis.com/v1/public/yql';
const YQL_SELECT = encodeURI('select pubDate, description ');
const YQL_FROM = encodeURI('from rss ');
const YQL_WHERE = encodeURI(`where url="${URL}"`);
const YQL_URL = `${YQL_ENDPOINT}?q=${YQL_SELECT}${YQL_FROM}${YQL_WHERE}&format=json`;
// eslint-disable-next-line
export const get = () => {
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
        !data.query ||
        !data.query.results ||
        !Array.isArray(data.query.results.item)
      ) {
        reject({
          message: '400',
        });
        return;
      }
      let maxAgeM = null;
      if (PUB_DATES && MAX_AGE !== Infinity) {
        maxAgeM = moment().subtract(MAX_AGE, 's');
      }
      let transformed = data.query.results.item.map((o, i) => {
        let description = o.description;
        if (description === undefined) return null;
        const match = RE.exec(description);
        if (match === null) return null;
        description = match[1];
        if (description === '') return null;
        const value = {
          id: i,
          description,
        };
        const dateM = moment(o.pubDate);
        if (PUB_DATES && !dateM.isValid()) return null;
        if (
          PUB_DATES &&
          maxAgeM !== null &&
          dateM.isBefore(maxAgeM)
        ) return null;
        if (PUB_DATES) value.pubDate = dateM.valueOf();
        return value;
      });
      transformed = transformed.filter(o => o !== null);
      if (PUB_DATES) transformed = transformed.sort((a, b) => b.pubDate - a.pubDate);
      resolve(transformed);
    });
  });
};
