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
    this.cyclingInterval = null;
  }
  componentDidMount() {
    this.fetch();
    setInterval(() => {
      this.fetch();
    }, POLLING * 1000);
  }
  cycle() {
    const { items } = this.props;
    if (items.length === 0) return;
    // TODO: TOGGLE EVEN / ODD
  }
  fetch() {
    const { fetchItems, setAppBlocking } = this.props;
    if (this.cyclingInterval !== null) {
      clearInterval(this.cyclingInterval);
      this.cyclingInterval = null;
    }
    setAppBlocking(true);
    return fetchItems()
      .then(
        () => {
          setAppBlocking(false);
          this.cyclingInterval = setInterval(this.cycle, CYCLING * 1000);
        },
        (error) => {
          if (process.env.NODE_ENV !== 'production'
            && error.name !== 'ServerException') {
            window.console.log(error);
          }
          setAppBlocking(false);
        },
      );
  }
  render() {
    const {
      appBlocking,
      fetchItemsErrorMessage,
      items,
      marqueeStart,
      setMarqueeStart,
    } = this.props;
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
            duration={CYCLING}
            marqueeStart={marqueeStart}
            setMarqueeStart={setMarqueeStart}
            text={
              PUB_DATES
              ? `${moment(items[0].pubDate).format('MMM D, h:mm A')} - ${items[0].description}`
              : items[0].description
            }
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
    marqueeStart: fromMarqueeStart.getMarqueeStart(state),
  }), {
    fetchItems: fromItems.fetchItems,
    setAppBlocking: fromAppBlocking.setAppBlocking,
    setEven: fromEven.setEven,
    setMarqueeStart: fromMarqueeStart.setMarqueeStart,
  },
)(App);
