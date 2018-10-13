import Emitter from './Emitter';
import { Bid } from '/models';

class Player extends Emitter {
  constructor(io, game, author) {
    super(io, game.room);
    this.game = game;
    this.connected = 1;

    this.user = author;
    this.submitted_at = null;
    this.typing = false;
    this.bid = null;
  }

  connect() {
    this.connected++;
    this.game.update();
  }

  disconnect() {
    if (--this.connected < 1) {
      this.game.removePlayer(this);
    }
  }

  startTyping() {
    this.typing = true;
    this.update();
  }

  stopTyping() {
    this.typing = false;
    this.update();
  }

  submit(amount) {
    this.submitted_at = new Date();
    new Bid({
      auction: this.game.auction,
      amount,
      author: this.user,
    }).force().save()
      .then(bid => {
        this.bid = bid.toJSON({ req: {} });
        if (this.game.isEveryoneDone()) return this.game.finish();
        this.update();
      })
      .catch(console.error);
  }

  update() {
    this.updated_at = new Date();
    this.emit('PLAYER_UPDATED', this);
  }

  toJSON() {
    const {
      user,
      submitted_at,
      given_up_at,
      typing,
      bid,
      ratings,
      average_stars,
    } = this;
    return {
      user,
      submitted_at,
      given_up_at,
      typing,
      bid,
      ratings,
      average_stars,
    };
  }
}

export default Player;
