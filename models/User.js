/** /models/User.js **/

const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const UserSchema = new Schema(
{
    userid: {
        type: String,
        required: true,
        trim: true
    },
    password:  {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    cellnumber: {
        type: String,
    },
    department: {
        type: String,
    },
    usertype: {
        type: Number,
    },
    semester: {
        type: Number,
    },
    lectures: {
        type: Array
    }
},
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;