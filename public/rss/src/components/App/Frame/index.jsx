import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { getWidget } from '../../../apis/widget';

const Frame = ({ children, empty, fetchItemsErrorMessage }) => {
  const { LIGHT, SIZE } = getWidget();
  let className;
  if (empty || fetchItemsErrorMessage !== null) {
    className = styles.rootEmpty;
  } else if (LIGHT) {
    className = styles.rootLightMarquee;
  } else if (!LIGHT) {
    className = styles.rootDarkMarquee;
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
  empty: PropTypes.bool.isRequired,
  fetchItemsErrorMessage: PropTypes.string,
};
Frame.defaultProps = {
  fetchItemsErrorMessage: null,
};
export default Frame;
