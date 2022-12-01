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
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cell_number: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    lecture_list: {
        type: Array,
        required: true,
    },
    image: {
        type: String  || null,
    }
},
);

const Profile = db.models.Profile || db.model('Profile', ProfileSchema, 'profiles');
module.exports = Profile;
