import React from 'react';
import { connect } from 'react-redux';
import { actions as envActions } from '/reducers/env';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie/src/js.cookie';
import { AuctionView, HoldView, HomeView } from '/views';
import { AuthApi, UserApi } from '/apis';
import styles from './stylesheet.scss';
import { classes } from '/common/util';

@withRouter
@connect(
  ({ env }) => ({
    env,
  }), {
    ...envActions,
  },
)
class App extends React.Component {
  componentDidMount() {
    if (Cookies.get('token')) {
      UserApi.getUser('me')
        .then(res => this.props.setAuthor(res.user));
    }
  }

  signIn() {
    AuthApi.createAuth()
      .then(() => UserApi.getUser('me'))
      .then(res => this.props.setAuthor(res.user));
  }

  signOut() {
    AuthApi.destroyAuth()
      .then(() => this.props.setAuthor(null));
  }

  render() {
    const { author } = this.props.env;
    const home = this.props.location.pathname === '/';
    return (
      <div className={classes(styles.app, home && styles.home)}>
        <header className={styles.header}>
          <Link to='/' className={styles.title}>
            <span>BidPal</span>
          </Link>
          <div className={styles.space}/>
          {
            author ?
              <a href='#' className={styles.sign_in} onClick={() => this.signOut()}>
                Sign Out
              </a> :
              <a href='#' className={styles.sign_in} onClick={() => this.signIn()}>
                Sign In
              </a>
          }
        </header>
        <Switch>
          <Route exact path="/"
                 component={(routeProps) => <HomeView {...routeProps} signIn={() => this.signIn()}/>}/>
          <Route path="/auction/:auction_id" component={AuctionView}/>
          <Route path="/hold/:auction_id" component={HoldView}/>
        </Switch>
      </div>
    );
  }
}

export default App;

