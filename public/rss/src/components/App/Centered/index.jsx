import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

const Centered = ({ text }) => (
  <div id={styles.root}>{text}</div>
);
Centered.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Centered;
