const mongoose = require('mongoose');
const { stringifyQuery } = require('next/dist/server/server-route-utils');
const db = mongoose.connection.useDb("lecture");

const InfoSchema = new mongoose.Schema({
    name: String,
    english_name: String,
    professor: String,
    lecture_num: String,
    open_semester: String,
    description: String,
    syllabus: Buffer,
    feedback: Boolean,
    department: String,
    major: String,
    lecture_date: String,
    lecture_type: String,
    is_ready: {
        type: Boolean,
        default: false,
    },
    is_opened: {
        type: Boolean,
        default: false,
    },
    saved_at: Date,
    user_list: Array,
});

const Info = db.models.Info || db.model('Info', InfoSchema, 'info');
module.exports = Info;
