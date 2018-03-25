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
        CYCLING: json.cycling,
        DESCRIPTION: json.description,
        DESCRIPTION_PARSE: json.descriptionParse,
        LIGHT: json.theme === 'light',
        LIMIT_DESCRIPTION: json.limitDescription,
        LIMIT_ITEMS: json.limitItems,
        MAX_AGE: json.maximumAge,
        MAX_DESCRIPTION: json.maximumDescription,
        MAX_ITEMS: json.maximumItems,
        POLLING: json.polling,
        PUB_DATES: json.publicationDates,
        SIZE: json.size,
        TITLE: json.title,
        TITLE_PARSE: json.titleParse,
        URL: json.url,
      };
      window.console.log(widget);
    })
    .catch(() => window.console.log('ERROR'));
};
