import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIGHT, POSITION, SIZE } from '../../../strings';
import styles from './index.scss';

class Marquee extends Component {
  constructor(props) {
    super(props);
    this.transformY = POSITION === 'upper' || POSITION === 'lower' ? '0%' : '-50%';
    if (POSITION === 'upper') {
      this.positionStyle = {
        top: '0px',
      };
    } else if (POSITION === 'lower') {
      this.positionStyle = {
        bottom: '0px',
      };
    } else {
      this.positionStyle = {
        top: '50%',
      };
    }
  }
  componentDidMount() {
    this.rootEl = document.getElementById(styles.rootMarquee);
    this.animate();
  }
  shouldComponentUpdate(nextProps) {
    const nextEven = nextProps.even;
    const nextMarqueeStart = nextProps.marqueeStart;
    const { even, marqueeStart } = this.props;
    if (nextEven !== even) return true;
    if (nextMarqueeStart !== marqueeStart) return true;
    return false;
  }
  componentDidUpdate(prevProps) {
    const prevEven = prevProps.even;
    const { even } = this.props;
    if (prevEven !== even) this.animate();
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
  even: PropTypes.bool.isRequired,
  marqueeStart: PropTypes.bool.isRequired,
  setMarqueeStart: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Marquee;
