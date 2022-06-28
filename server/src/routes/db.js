const mongoose = require('mongoose');
const dotenv = require("dotenv");
const config = require('../config/config');

dotenv.config(); //LOAD CONFOG

// const MongoDb = process.env.MONGODB_URI
// const MongoDb = "mongodb+srv://Sunwoo:sunkim8609@cluster0.yzrxx.mongodb.net/Cheppy?retryWrites=true&w=majority"

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('db success connect')
  } catch (err) {
    console.log('error connecting to database')
    console.log(err)
    process.exit(1)
  }
}

// export default connectDb
module.exports = connectDb