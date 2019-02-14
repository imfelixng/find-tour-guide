const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    required: false,
    max: 5,
    min: 0,
    default: 0,
  },
});

module.exports = mongoose.model('Location', LocationSchema);
