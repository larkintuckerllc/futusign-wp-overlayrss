import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromEven from '../../ducks/even';
import * as fromItems from '../../ducks/items';
import * as fromMarqueeStart from '../../ducks/marqueeStart';
import Frame from './Frame';
import Bad from './Bad';
import Offline from './Offline';
import Marquee from './Marquee';
import { fetchBase } from '../../apis/base';
import { fetchWidget, getWidget } from '../../apis/widget';

class App extends Component {
  constructor(props) {
    super(props);
    // HACKED IN PLAYING
    this.state = { playing: false };
    this.cycle = this.cycle.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    // HACKED IN BASE AND WIDGET
    fetchBase()
      .then(fetchWidget)
      .then(() => {
        this.setState({ playing: true });
        return this.fetch();
      })
      .then(this.cycle)
      .then(() => {
        const { POLLING } = getWidget();
        setInterval(() => {
          this.fetch();
        }, POLLING * 1000);
      });
  }
  cycle() {
    setTimeout(() => {
      const { even, setEven } = this.props;
      this.cycle();
      setEven(!even);
    }, (this.duration() * 1000));
  }
  fetch() {
    const { fetchItems } = this.props;
    return fetchItems()
      .then(
        () => {},
        (error) => {
          if (process.env.NODE_ENV !== 'production'
            && error.name !== 'ServerException') {
            window.console.log(error);
          }
        },
      );
  }
  duration() {
    const { text } = this.props;
    const { SIZE, CYCLING } = getWidget();
    return (((text.length + (window.innerWidth / SIZE)) / CYCLING));
  }
  render() {
    const { playing } = this.state;
    if (!playing) return null;
    const {
      even,
      fetchItemsErrorMessage,
      items,
      marqueeStart,
      setMarqueeStart,
      text,
    } = this.props;
    return (
      <Frame
        empty={text.length === 0}
        fetchItemsErrorMessage={fetchItemsErrorMessage}
      >
        {
          fetchItemsErrorMessage === '400' &&
          <Bad />
        }
        {
          fetchItemsErrorMessage === '500' &&
          <Offline />
        }
        {
          fetchItemsErrorMessage === null &&
          text.length !== 0 &&
          <Marquee
            duration={this.duration()}
            even={even}
            items={items}
            marqueeStart={marqueeStart}
            setMarqueeStart={setMarqueeStart}
          />
        }
      </Frame>
    );
  }
}
App.propTypes = {
  even: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  fetchItemsErrorMessage: PropTypes.string,
  // eslint-disable-next-line
  items: PropTypes.array.isRequired,
  marqueeStart: PropTypes.bool.isRequired,
  setEven: PropTypes.func.isRequired,
  setMarqueeStart: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
App.defaultProps = {
  fetchItemsErrorMessage: null,
};
export default connect(
  state => ({
    fetchItemsErrorMessage: fromItems.getFetchItemsErrorMessage(state),
    even: fromEven.getEven(state),
    items: fromItems.getItems(state),
    marqueeStart: fromMarqueeStart.getMarqueeStart(state),
    text: fromItems.getText(state),
  }), {
    fetchItems: fromItems.fetchItems,
    setEven: fromEven.setEven,
    setMarqueeStart: fromMarqueeStart.setMarqueeStart,
  },
)(App);
