const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true
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
  role: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Account', AccountSchema);