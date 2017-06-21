import React from 'react';
import PropTypes from 'prop-types';
import { LIGHT, MARQUEE, SIZE } from '../../../strings';
import styles from './index.scss';

const Frame = ({ children }) => {
  let className;
  if (MARQUEE && LIGHT) {
    className = styles.rootLightMarquee;
  } else if (MARQUEE && !LIGHT) {
    className = styles.rootDarkMarquee;
  } else if (!MARQUEE && LIGHT) {
    className = styles.rootLight;
  } else if (!MARQUEE && !LIGHT) {
    className = styles.rootDark;
  }
  return (
    <div
      id={styles.root}
      style={{ fontSize: `${SIZE.toString()}px` }}
      className={className}
    >
      {children}
    </div>
  );
};
Frame.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Frame;
