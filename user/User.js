var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');