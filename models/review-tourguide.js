const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewTourGuideSchema = new Schema({
  idTourGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourGuide',
    required: true,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
    default: 0,
  }
});

module.exports = mongoose.model('ReviewTourGuide', ReviewTourGuideSchema);