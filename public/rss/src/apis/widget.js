import { ID, SITE_URL } from '../strings';
import { getPretty } from './base';

let widget = null;
export function getWidget() {
  return widget;
}
export const get = () => {
  const ENDPOINT = getPretty() ?
    `${SITE_URL}fs-or-endpoint?futusign_or_widget_id=${ID.toString()}` :
    `${SITE_URL}?fs-or-endpoint=1&futusign_or_widget_id=${ID.toString()}`;
  return fetch(ENDPOINT)
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((json) => {
      widget = {
        CYCLING: parseInt(json.cycling, 10),
        DESCRIPTION: json.description === 'true',
        DESCRIPTION_PARSE: json.descriptionParse,
        LIGHT: json.theme === 'light',
        LIMIT_DESCRIPTION: json.limitDescription === 'true',
        LIMIT_ITEMS: json.limitItems === 'true',
        MAX_AGE: json.maximumAge,
        MAX_DESCRIPTION: json.maximumDescription,
        MAX_ITEMS: json.maximumItems,
        POLLING: parseInt(json.polling, 10),
        PUB_DATES: json.publicationDates,
        SIZE: parseInt(json.size, 10),
        TITLE: json.title === 'true',
        TITLE_PARSE: json.titleParse,
        URL: json.url,
      };
    })
    .catch(() => window.console.log('ERROR'));
};
