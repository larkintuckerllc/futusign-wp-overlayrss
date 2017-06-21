import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

class Marquee extends Component {
  componentDidMount() {
    this.rootEl = document.getElementById(styles.root);
    this.animate();
  }
  componentDidUpdate(prevProps) {
    const prevText = prevProps.text;
    const { text } = this.props;
    if (prevText !== text) this.animate();
  }
  animate() {
    const { setMarqueeStart } = this.props;
    setMarqueeStart(false);
    setTimeout(() => {
      setMarqueeStart(true);
    }, 1000);
  }
  render() {
    const { duration, marqueeStart, text } = this.props;
    const windowWidth = window.innerWidth;
    const rootWidth = this.rootEl !== undefined
      ? this.rootEl.offsetWidth
      : 0;
    return (
      <div
        style={
          marqueeStart
          ? {
            transition: `transform ${(duration - 1).toString()}s linear`,
            transform: `translate(-${rootWidth.toString()}px, -50%)`,
          }
          : {
            transition: 'transform 0s linear',
            transform: `translate(${windowWidth.toString()}px, -50%)`,
          }
        }
        id={styles.root}
      >{text}</div>
    );
  }
}
Marquee.propTypes = {
  duration: PropTypes.number.isRequired,
  marqueeStart: PropTypes.bool.isRequired,
  setMarqueeStart: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Marquee;
