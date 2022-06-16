import mongoose from 'mongoose'

const { Schema, Types } = mongoose

const UserSchema = new Schema(
{
    id: {
        type: Types.ObjectId,
        required: true,
        trim: true
    },
    userid: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    cellnumber: {
        type: String,
        required: false,
        trim: true
    },
    department: {
        type: String,
        required: false,
        trim: false
    },
    usertype: {
        type: Number,
        required: false,
    },
    semester: {
        type: Number,
        required: false,
    }
},
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User