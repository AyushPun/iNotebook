const mongoose = require('mongoose');   //https://mongoosejs.com/
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected To Mongo Successfully");
    })
}

module.exports = connectToMongo;