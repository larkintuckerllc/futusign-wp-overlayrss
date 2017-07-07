import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { LIMIT_ITEMS, MAX_ITEMS, PUB_DATES } from '../../../../strings';

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
          <b>{o.title}: </b>
          {o.description}
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
