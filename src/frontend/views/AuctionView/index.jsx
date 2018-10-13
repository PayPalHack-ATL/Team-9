import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from './stylesheet.scss';
import { classes, nn } from '/common/util';
import Cookies from 'js-cookie/src/js.cookie';
import { Player } from '/components';
import { AuctionApi, ImageApi } from '../../apis';
import { ImageUploader } from '../../components';

let socket = null;

@withRouter
@connect(
  ({ env }) => ({
    env,
  }),
)
class AuctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      last_tick_at: null,
      time_elapsed: null,
      last_typed_at: null,
      code: null,
      selected_username: null,
      game: {
        countdown_at: null,
        started_at: null,
        updated_at: null,
        finished_at: null,
        players: [],
        auction: null,
      },
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
    const { author } = this.props.env;
    const { auction_id } = this.props.match.params;
    if (author) {
      this.setState({ selected_username: author.username });

      socket = socketIOClient(`http://${window.location.host}`, { path: '/api/socket' });
      const token = Cookies.get('token');
      socket.emit('AUTH', { token, auction_id });
      socket.on('GAME_UPDATED', game => {
        const {
          countdown_at,
          started_at,
          updated_at,
        } = game;
        const last_tick_at = new Date();
        const time_elapsed = new Date(updated_at) - new Date(started_at || countdown_at);
        this.setState({ last_tick_at, time_elapsed, game });
      });
      socket.on('PLAYER_UPDATED', updated_player => {
        const players = [...this.state.game.players];
        const index = players.findIndex(player => player.user.username === updated_player.user.username);
        players[index] = updated_player;
        const game = { ...this.state.game, players };
        this.setState({ game });
      });
      socket.on('GAME_REMOVED', () => this.setState({ game: null }));
    }

    this.intervalId = setInterval(() => {
      const { last_tick_at, time_elapsed, last_typed_at } = this.state;
      const me = this.findPlayer(author.username);
      const now = new Date();
      if (me) {
        if (!me.typing && (now - last_typed_at) < 300) {
          socket.emit('START_TYPING');
        }
        if (me.typing && (now - last_typed_at) >= 300) {
          socket.emit('STOP_TYPING');
        }
      }
      if (last_tick_at) {
        this.setState(state => ({
          time_elapsed: time_elapsed + (now - last_tick_at),
          last_tick_at: now,
        }));
      }
    }, 300);

    AuctionApi.getAuction(auction_id)
      .then(({ auction }) => this.setState({ auction }))
      .catch(console.error);
  }

  componentWillUnmount() {
    if (socket) socket.disconnect();

    clearInterval(this.intervalId);
  }

  onChange(value) {
    this.setState({ last_typed_at: new Date(), code: value, errors: null });
  }

  submit() {
    socket.emit('SUBMIT', this.state.code);
  }

  select(player) {
    this.setState({ selected_username: player.user.username });
  }

  findPlayer(username, players = this.state.game.players) {
    return players.find(player => player.user.username === username);
  }

  render() {
    const { author } = this.props.env;
    const {
      time_elapsed,
      selected_username,
      game,
      auction,
    } = this.state;
    const {
      countdown_at,
      started_at,
      finished_at,
      players,
    } = game;

    if (!author || !game) return null;

    const me = this.findPlayer(author.username) || {
      user: author,
      submitted_at: null,
      typing: false,
      bid: null,
    };
    const player = this.findPlayer(selected_username) || me;

    let status = <span>Waiting for players</span>;
    if (finished_at) {
      status = <span>Auction ended</span>;
    } else if (started_at) {
      const time_remaining = Math.max(auction.time - time_elapsed / 1000, 0);
      status = <span className={styles.big}>{nn(time_remaining / 60 | 0) + ':' + nn(time_remaining % 60 | 0)}</span>;
    } else if (countdown_at) {
      const time_remaining = (10 - time_elapsed / 1000) | 0;
      status = <span>Starting in {time_remaining} seconds</span>;
    }
    const done = finished_at || me.submitted_at || me.given_up_at;
    return (
      <div className={styles.auction_view}>
        <div className={styles.status}>
          {status}
        </div>
        {
          auction ?
            <div className={styles.problem_panel}>
              <div className={styles.image}
                             style={{ backgroundImage: `url(${ImageApi.original(auction.image)})` }}/>
              <div className={styles.title}>
                {auction.title}
              </div>
              <div className={styles.content}>
                {auction.content}
              </div>
              <div className={styles.price}>
                Started from ${auction.starting_price}
              </div>
            </div> :
            <div className={styles.problem_panel}>
            </div>
        }
        <div className={styles.status_panel}>
          <div className={styles.versus}>
            <span>Players</span>
          </div>
          {
            players.map(player => (
              <Player key={player.user.username} onClick={() => done && this.select(player)} player={player}/>
            ))
          }
        </div>
        <div className={styles.ide_panel}>
          <Player className={styles.player} player={player}/>
          <div className={styles.log}>
            <span>Jason Park outbids with $370</span>
            <span>Kevin Park outbids with $390</span>
          </div>
          <div className={styles.toolbar}>
            {
              [410, 430, 450, 470, 490].map((amount, i) => (
                <a href='#' className={classes(styles.button, styles.run)} onClick={() => this.run()}>
                  <span>${amount}</span>
                </a>
              ))
            }
            <Link to='/' className={classes(styles.button, styles.exit)}>
              <span>Exit</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionView;
