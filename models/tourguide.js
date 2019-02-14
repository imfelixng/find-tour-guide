const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourGuideSchema = new Schema({
  idTourGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourGuide',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('TourGuide', TourGuideSchema);