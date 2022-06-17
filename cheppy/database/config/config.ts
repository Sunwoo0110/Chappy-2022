const mongoose = require('mongoose')

//const MongoDb = process.env.MONGODB_URI
const MongoDb = "mongodb+srv://baek:0125@cluster0.5fcuysg.mongodb.net/?retryWrites=true&w=majority"

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {
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

export default connectDb