import React from 'react';
import PropTypes from 'prop-types';
import { LIGHT, SIZE } from '../../../strings';
import styles from './index.scss';

const Frame = ({ children }) => (
  <div
    id={styles.root}
    style={{ lineHeight: '150%', fontSize: `${SIZE.toString()}px` }}
    className={LIGHT ? styles.rootLight : styles.rootDark}
  >
    {children}
  </div>
);
Frame.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Frame;
