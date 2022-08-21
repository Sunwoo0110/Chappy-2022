const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const NoticeSchema = new mongoose.Schema({
    lecture_id: mongoose.Schema.Types.ObjectId,
    title: String,
    type: String,
    created_at: mongoose.Schema.Types.Date,
    description: String, 
});

const Notice = db.models.Notice || db.model('Notice', NoticeSchema, 'notice');
module.exports = Notice;
