const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedDataSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String
  },
  date: { type: Date, default: Date.now }
});

module.exports = SavedData = mongoose.model('saveData', SavedDataSchema);
