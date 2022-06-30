const mongoose = require('mongoose');
const dotenv = require("dotenv");
const config = require('../config/config');

dotenv.config(); //LOAD CONFIG

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