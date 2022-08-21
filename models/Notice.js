import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    description: String,
});

module.exports = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema)
