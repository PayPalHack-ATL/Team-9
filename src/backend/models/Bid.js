import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';
import Auction from './Auction';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Bid';
const bidSchema = new Schema({
  auction: { type: ObjectId, ref: 'Auction', required: true },
  amount: { type: Number, required: true },
  author: { type: ObjectId, ref: 'User' },
});

bidSchema.plugin(authorPlugin, {
  authorField: true,
  insert: {
    user: true,
  },
  modify: {
    none: true,
  },
  get: {
    guest: true,
  },
  remove: {
    none: true,
  }
});

const Bid = db.model(modelName, bidSchema);
export default Bid;
