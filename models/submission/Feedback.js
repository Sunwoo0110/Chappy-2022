const mongoose = require('mongoose');
const db = mongoose.connection.useDb("submission");

const FeedbackSchema = new mongoose.Schema({
    submission_id: mongoose.Schema.Types.ObjectId,
    content: String,
    check: Boolean,
});

const Feedback = db.models.Feedback || db.model('Feedback', FeedbackSchema, 'feedbacks');
module.exports = Feedback;
