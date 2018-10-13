import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { classes, nn } from '/common/util';
import { AuctionApi, ImageApi } from '/apis';
import { ImageUploader } from '/components';
import styles from './stylesheet.scss';

@withRouter
@connect(
  ({ env }) => ({
    env,
  }),
)
class HoldView extends React.Component {
  constructor(props) {
    super(props);

    const { auction_id } = props.match.params;
    this.state = {
      auction_id,
      auction: {
        image: '',
        title: '',
        content: '',
        time: 180,
        starting_price: 0,
        private: true,
      },
    };
  }

  componentDidMount() {
    const { auction_id } = this.state;
    if (auction_id !== 'new') {
      AuctionApi.getAuction(auction_id)
        .then(({ auction }) => this.setState({ auction }))
        .catch(console.error);
    }
  }

  updateAuction(change) {
    this.setState({
      auction: {
        ...this.state.auction,
        ...change,
      },
    });
  }

  onMinuteChange(e) {
    const minute = Number(e.target.value) % 100;
    const time = minute * 60 + this.state.auction.time % 60;
    if (isNaN(time)) return;
    this.updateAuction({ time });
  }

  onSecondChange(e) {
    let second = Number(e.target.value) % 100;
    if (second >= 60) second %= 10;
    const time = (this.state.auction.time / 60 | 0) * 60 + second;
    if (isNaN(time)) return;
    this.updateAuction({ time });
  }

  onTitleChange(e) {
    const title = e.target.value;
    this.updateAuction({ title });
  }

  onContentChange(e) {
    const content = e.target.value;
    this.updateAuction({ content });
  }

  onPriceChange(e) {
    const starting_price = e.target.value;
    this.updateAuction({ starting_price });
  }

  save() {
    const { auction_id, auction } = this.state;
    const promise = auction_id === 'new' ?
      AuctionApi.addAuction(auction) :
      AuctionApi.updateAuction(auction_id, auction);
    promise
      .then(() => this.setState({ auction_id: null }))
      .catch(console.error);
  }

  remove() {
    const { auction_id } = this.state;
    if (auction_id === 'new') {
      this.setState({ auction_id: null });
    } else {
      AuctionApi.deleteAuction(auction_id)
        .then(() => this.setState({ auction_id: null }))
        .catch(console.error);
    }
  }

  render() {
    const { author } = this.props.env;
    const {
      auction_id,
      auction,
    } = this.state;

    if (!author || !auction_id) return <Redirect to='/'/>;

    const disabled =
      auction.image === '' ||
      auction.title === '' ||
      auction.content === '' ||
      auction.starting_price === 0;

    return (
      <div className={styles.hold_view}>
        <div className={styles.status}>
          <input className={styles.time} type='text' value={nn(auction.time / 60 | 0)}
                 onChange={e => this.onMinuteChange(e)}/>
          :
          <input className={styles.time} type='text' value={nn(auction.time % 60)}
                 onChange={e => this.onSecondChange(e)}/>
        </div>
        <div className={styles.problem_panel}>
          <ImageUploader className={styles.image_uploader}
                         uploaded={auction.image}
                         style={{ backgroundImage: `url(${ImageApi.original(auction.image)})` }}
                         onUpload={image => this.updateAuction({ image })}/>
          <input className={styles.title} type='text' value={auction.title} onChange={e => this.onTitleChange(e)}
                 placeholder='Title'/>
          <textarea className={styles.content} onChange={e => this.onContentChange(e)} rows={4}
                    value={auction.content} placeholder='Description'/>
          <div className={styles.price}>
            <span>$</span>
            <input type='text' value={auction.starting_price}
                   onChange={e => this.onPriceChange(e)}
                   placeholder='Starting Price'/>
          </div>
          <div className={styles.publicity}>
            <a href='#' className={classes(styles.button, auction.private && styles.active)}
               onClick={() => this.updateAuction({ private: true })}>
              <span>Private</span>
            </a>
            <a href='#' className={classes(styles.button, !auction.private && styles.active)}
               onClick={() => this.updateAuction({ private: false })}>
              <span>Public</span>
            </a>
          </div>
          <div className={styles.toolbar}>
            <a href='#' className={classes(styles.button, styles.save, disabled && styles.disabled)}
               onClick={() => this.save()}>
              <span>Save</span>
            </a>
            <a href='#' className={classes(styles.button, styles.remove)} onClick={() => this.remove()}>
              <span>Remove</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HoldView;
