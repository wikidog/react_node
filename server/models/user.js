const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// define model
const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  //   // mongodb is case-sensitive; always change string to lower case
  //   lowercase: true,
  //   required: [true, 'Email is required.'],
  // },
});

// mongoose middleware
//

// create the model class
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;
