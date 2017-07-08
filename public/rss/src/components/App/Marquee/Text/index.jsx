import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  DESCRIPTION,
  LIMIT_ITEMS,
  LIMIT_DESCRIPTION,
  MAX_DESCRIPTION,
  MAX_ITEMS,
  PUB_DATES,
  TITLE,
} from '../../../../strings';

const Text = ({ items }) => {
  const count = LIMIT_ITEMS ?
    Math.min(items.length, MAX_ITEMS) :
    items.length;
  return (
    // HAVE TO DUPLICATE IN DUCK FOR COUNT
    <span>
      {items.slice(0, count).map((o, i) => (
        <span
          key={o.id}
        >
          {PUB_DATES && <b>{moment(o.pubDate).format('MMM D, h:mm A')} - </b>}
          {TITLE && !DESCRIPTION && o.title}
          {TITLE && DESCRIPTION && <b>{o.title}: </b>}
          {DESCRIPTION && o.description.slice(0,
            LIMIT_DESCRIPTION ?
            Math.min(o.description.length, MAX_DESCRIPTION) :
            o.description.length,
          )}
          {DESCRIPTION && LIMIT_DESCRIPTION && '...'}
          {i !== count - 1 && ' \u25cf '}
        </span>
      ))}
    </span>
  );
};
Text.propTypes = {
  // eslint-disable-next-line
  items: PropTypes.array.isRequired,
};
export default Text;
