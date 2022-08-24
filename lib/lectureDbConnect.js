/** /lib/dbConnect.js **/
import mongoose from 'mongoose'

/**
Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI_USER = process.env.MONGODB_URI_USER
const MONGODB_URI_LECTURE = process.env.MONGODB_URI_LECTURE
const MONGODB_URI_SUBMISSON = process.env.MONGODB_URI_SUBMISSION

if (!MONGODB_URI_USER) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function lectureDbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = mongoose.connect(MONGODB_URI_LECTURE, opts).then(mongoose => {
            console.log("lecture MongoDB Connected");
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}


export default lectureDbConnect
