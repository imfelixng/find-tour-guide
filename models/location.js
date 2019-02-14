const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Location', LocationSchema);
