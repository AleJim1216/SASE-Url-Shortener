const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortenerSchema = new Schema({
  shortId: String,
  originalUrl: String,
  count: {type: Number, default: 0}
});

module.exports = mongoose.model('Shortener', shortenerSchema);
