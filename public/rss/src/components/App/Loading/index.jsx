import React from 'react';
import styles from './index.scss';
import loading from './loading.png';

const Loading = () => (
  <img
    id={styles.root}
    src={loading}
    alt="spinner"
    width="75"
    height="75"
  />
);
export default Loading;
