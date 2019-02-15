const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewLocationSchema = new Schema({
  idLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
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
    type: String,
    required: true,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model('ReviewLocation', ReviewLocationSchema);
