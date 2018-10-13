import mongoose from 'mongoose';
import { mongoUri } from '/environment';
import { bidPalPlugin } from '/models/plugins';

mongoose.Promise = global.Promise;
mongoose.plugin(bidPalPlugin);
const db = mongoose.createConnection(mongoUri);

export default db;
