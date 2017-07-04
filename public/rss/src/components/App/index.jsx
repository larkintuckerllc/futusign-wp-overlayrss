import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { CYCLING, POLLING, PUB_DATES } from '../../strings';
import * as fromAppBlocking from '../../ducks/appBlocking';
import * as fromEven from '../../ducks/even';
import * as fromItems from '../../ducks/items';
import * as fromMarqueeStart from '../../ducks/marqueeStart';
import Frame from './Frame';
import Bad from './Bad';
import Offline from './Offline';
import Marquee from './Marquee';

class App extends Component {
  constructor(props) {
    super(props);
    this.cycle = this.cycle.bind(this);
    this.fetch = this.fetch.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.cyclingInterval = null;
  }
  componentDidMount() {
    this.fetch();
    setInterval(() => {
      this.fetch();
    }, POLLING * 1000);
  }
  cycle() {
    const { even, setEven } = this.props;
    setEven(!even);
  }
  fetch() {
    // TODO: MORE GRACEFUL FETCH
    const { fetchItems, setAppBlocking } = this.props;
    if (this.cyclingInterval !== null) {
      clearInterval(this.cyclingInterval);
      this.cyclingInterval = null;
    }
    setAppBlocking(true);
    return fetchItems()
      .then(
        this.handleFetch,
        (error) => {
          if (process.env.NODE_ENV !== 'production'
            && error.name !== 'ServerException') {
            window.console.log(error);
          }
          setAppBlocking(false);
        },
      );
  }
  handleFetch() {
    // TODO: WORK IN CYCLING
    const { length, setAppBlocking } = this.props;
    setAppBlocking(false);
    this.cyclingInterval = setInterval(this.cycle, (length / 10) * 1000);
  }
  render() {
    // TODO: WORK IN CYCLING
    const {
      appBlocking,
      even,
      fetchItemsErrorMessage,
      items,
      length,
      marqueeStart,
      setMarqueeStart,
    } = this.props;
    // TODO: MOVE TO DUCK
    let text = '';
    if (items.length !== 0) {
      for (let i = 0; i < items.length; i += 1) {
        let iText = PUB_DATES
          ? `${moment(items[i].pubDate).format('MMM D, h:mm A')} - ${items[i].description}`
          : items[i].description;
        iText = even ? ` E ${iText}` : ` O ${iText}`;
        text += iText;
      }
    }
    return (
      <Frame
        empty={items.length === 0}
        fetchItemsErrorMessage={fetchItemsErrorMessage}
      >
        {
          appBlocking &&
          null
        }
        {
          !appBlocking &&
          fetchItemsErrorMessage === '400' &&
          <Bad />
        }
        {
          !appBlocking &&
          fetchItemsErrorMessage === '500' &&
          <Offline />
        }
        {
          !appBlocking &&
          fetchItemsErrorMessage === null &&
          items.length !== 0 &&
          <Marquee
            duration={length / 10}
            marqueeStart={marqueeStart}
            setMarqueeStart={setMarqueeStart}
            text={text}
          />
        }
      </Frame>
    );
  }
}
App.propTypes = {
  appBlocking: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  fetchItemsErrorMessage: PropTypes.string,
  marqueeStart: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  length: PropTypes.number.isRequired,
  setAppBlocking: PropTypes.func.isRequired,
  setEven: PropTypes.func.isRequired,
  setMarqueeStart: PropTypes.func.isRequired,
};
App.defaultProps = {
  fetchItemsErrorMessage: null,
};
export default connect(
  state => ({
    appBlocking: fromAppBlocking.getAppBlocking(state),
    fetchItemsErrorMessage: fromItems.getFetchItemsErrorMessage(state),
    even: fromEven.getEven(state),
    items: fromItems.getItems(state),
    length: fromItems.getLength(state),
    marqueeStart: fromMarqueeStart.getMarqueeStart(state),
  }), {
    fetchItems: fromItems.fetchItems,
    setAppBlocking: fromAppBlocking.setAppBlocking,
    setEven: fromEven.setEven,
    setMarqueeStart: fromMarqueeStart.setMarqueeStart,
  },
)(App);
