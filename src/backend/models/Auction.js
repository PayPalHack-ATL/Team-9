import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Auction';
const auctionSchema = new Schema({
  image: { type: ObjectId, ref: 'Image', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, required: true, min: 1, validate: Number.isInteger },
  starting_price: { type: Number, required: true },
  top_bids: [{ type: ObjectId, ref: 'Bid', required: true }],
  author: { type: ObjectId, ref: 'User' },
});

auctionSchema.plugin(authorPlugin, {
  authorField: true,
  set: {
    none: ['top_bids'],
  },
  insert: {
    user: true,
  },
  modify: {
    owner: true,
  },
  get: {
    guest: true,
  },
  remove: {
    owner: true,
  },
});

const Auction = db.model(modelName, auctionSchema);
export default Auction;
