const mongoose = require('mongoose')

//const MongoDb = process.env.MONGODB_URI
// const MongoDb = "mongodb+srv://Sunwoo:sunkim8609@cluster0.yzrxx.mongodb.net/Cheppy?retryWrites=true&w=majority"
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

<<<<<<< HEAD
export default connectDb
=======
export default connectDb
>>>>>>> 66787d4988b48d48110de7c7e9ce04119ce501ae
