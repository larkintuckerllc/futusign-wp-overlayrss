import moment from 'moment';
import Parser from 'rss-parser';
import { SITE_URL } from '../strings';
import { getPretty } from './base';
import { getWidget } from './widget';

const parser = new Parser();
let drift = 0;
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
  const {
    DESCRIPTION,
    DESCRIPTION_PARSE,
    MAX_AGE,
    PUB_DATES,
    TITLE,
    TITLE_PARSE,
    URL,
  } = getWidget();
  if (URL === null) {
    return Promise.reject({
      message: '400',
    });
  }
  const RE_DESCRIPTION = new RegExp(DESCRIPTION_PARSE, 'm');
  const RE_TITLE = new RegExp(TITLE_PARSE, 'm');
  const RE_STRIP = /^\s*(.*)\s*/;
  const ENDPOINT = getPretty() ?
    `${SITE_URL}fs-or-rss-endpoint?futusign_or_rss_url=${URL}` :
    `${SITE_URL}?fs-or-rss-endpoint?futusign_or_rss_url=${URL}`;
  window.parent.postMessage({
    type: 'MSG_TIME',
  }, '*');
  let maxAgeM = null;
  if (PUB_DATES) {
    maxAgeM = moment(Date.now() - drift).subtract(MAX_AGE, 's');
  }
  return fetch(ENDPOINT)
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.text();
    })
    .then(xml => parser.parseString(xml))
    .then((json) => {
      let transformed = json.items.map((o, i) => {
        const value = {
          id: i,
        };
        // TITLE
        if (TITLE && o.title === undefined) return null;
        if (TITLE) {
          let title = o.title;
          let match = RE_STRIP.exec(title);
          if (match === null) return null;
          title = match[1];
          match = RE_TITLE.exec(title);
          if (match === null) return null;
          title = match[1];
          if (title === '') return null;
          value.title = title;
        }
        // DESCRIPTION
        if (DESCRIPTION && o.content === undefined) return null;
        if (DESCRIPTION) {
          let description = o.content;
          let match = RE_STRIP.exec(description);
          if (match === null) return null;
          description = match[1];
          match = RE_DESCRIPTION.exec(description);
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
      return transformed;
    });
};
