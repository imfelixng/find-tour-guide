const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: false,
  },
  birthdayDate: {
    type: Date,
    required: false,
  },
  role: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = mongoose.model('Account', AccountSchema);