import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIGHT, POSITION, SIZE } from '../../../strings';
import styles from './index.scss';

class Marquee extends Component {
  constructor(props) {
    super(props);
    this.transformY = POSITION === 'upper' || POSITION === 'lower' ? '0%' : '-50%';
    this.positionStyle = {
      top: '50%',
    };
    if (POSITION === 'upper') {
      this.positionStyle = {
        top: '0px',
      };
    }
    if (POSITION === 'lower') {
      this.positionStyle = {
        bottom: '0px',
      };
    }
  }
  componentDidMount() {
    this.rootEl = document.getElementById(styles.rootMarquee);
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
      <div id={styles.root}>
        <div
          id={styles.rootFrame}
          style={{
            backgroundColor: LIGHT ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            padding: `${(SIZE / 2).toString()}px`,
            transform: `translate(0px, ${this.transformY})`,
            ...this.positionStyle,
          }}
        >
          {'\u00A0'}
        </div>
        <div
          id={styles.rootMarquee}
          style={{
            padding: `${(SIZE / 2).toString()}px`,
            ...this.positionStyle,
            ...(marqueeStart
            ? {
              transition: `transform ${(duration - 1).toString()}s linear`,
              transform: `translate(-${rootWidth.toString()}px, ${this.transformY})`,
            }
            : {
              transition: 'transform 0s linear',
              transform: `translate(${windowWidth.toString()}px, ${this.transformY})`,
            }),
          }}
        >{text}</div>
      </div>
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
