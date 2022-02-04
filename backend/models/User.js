const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type : String, 
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
  });
  const User = mongoose.model('user', UserSchema);
//   User.createIndexes()  //no duplicate data will be saved in database at all (it creates on bases of email as it must be unique but also creating a problem of extra index in db along with id index)
  module.exports = User