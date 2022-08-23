const mongoose = require('mongoose');
const db = mongoose.connection.useDb("user");

const ProfileSchema = new mongoose.Schema(
{
    user_id: {
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
    name: {
        type: String,
    },
    cell_number: {
        type: String,
    },
    department: {
        type: String,
    },
    type: {
        type: Number,
    },
    semester: {
        type: Number,
    },
    lecture_list: {
        type: Array
    },
    image: {
        type: String  || null,
    }
},
);

const Profile = db.models.Profile || db.model('Profile', ProfileSchema, 'profile');
module.exports = Profile;
