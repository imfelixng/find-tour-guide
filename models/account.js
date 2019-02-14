const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  birthdayDate: {
    type: Date,
    required: false,
  },
  role: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
