import React from 'react';
import styles from './stylesheet.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuctionApi } from '/apis';
import { classes } from '/common/util';

const limit = 5;

@withRouter
@connect(
  ({ env }) => ({
    env,
  }),
)
class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auctions: [],
    };
  }

  componentDidMount() {
    AuctionApi.allAuctions({ populate: 'author' })
      .then(({ auctions }) => this.setState({ auctions }))
      .catch(console.error);
  }

  render() {
    const { author } = this.props.env;
    const { auctions } = this.state;

    return (
      <div className={styles.home_view}>
        <div className={styles.cover}>
          <span className={styles.slogan}>
            Tired of being an average <br/>poor college student?<br/>Bidpal now.
          </span>
          {
            author ?
              <div className={styles.button_container}>
                <Link to='/hold/new' className={styles.button}>
                  HOLD AN AUCTION
                </Link>
              </div> :
              <div className={styles.button_container}>
                <a href='#' className={styles.button} onClick={this.props.signIn}>
                  SIGN IN
                </a>
              </div>
          }
        </div>
        <div className={styles.auctions}>
          <div className={styles.label}>
            <span>Ongoing auctions</span>
          </div>
          {
            auctions.map(auction => {
              return (
                <div className={styles.section} key={auction._id}>
                  <div className={styles.auction}>
                    <div className={styles.title_bar}>
                      <Link to={`/auction/${auction._id}`} className={classes(styles.title, styles.owned)}>
                        {auction.title}
                      </Link>
                      <div className={styles.space}/>
                      <div className={styles.picture}
                           style={{ backgroundImage: `url(${auction.author.avatar})` }}/>
                      <div className={styles.name}>
                        {auction.author.name}
                      </div>
                    </div>
                    <div className={styles.content}>
                      {auction.content}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default HomeView;
