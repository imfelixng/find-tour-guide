const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourGuideSchema = new Schema({
  idTourGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: false,
  },
  intro: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
  star: {
    type: Number,
    required: false,
    default: 0
  },
});

module.exports = mongoose.model('TourGuide', TourGuideSchema);
