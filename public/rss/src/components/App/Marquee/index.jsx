import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import styles from './index.scss';
import { getWidget } from '../../../apis/widget';
import { POSITION } from '../../../strings';

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
    const { LIGHT, SIZE } = getWidget();
    const { duration, items, marqueeStart } = this.props;
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
        ><Text items={items} /></div>
      </div>
    );
  }
}
Marquee.propTypes = {
  duration: PropTypes.number.isRequired,
  even: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  items: PropTypes.array.isRequired,
  marqueeStart: PropTypes.bool.isRequired,
  setMarqueeStart: PropTypes.func.isRequired,
};
export default Marquee;
