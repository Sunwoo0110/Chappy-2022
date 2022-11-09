const mongoose = require('mongoose');
const db = mongoose.connection.useDb("submission");

const SubmissionSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    lecture_id: mongoose.Schema.Types.ObjectId,
    type: Number,
    ref_id: mongoose.Schema.Types.ObjectId,
    user_code: String,
    submission_state: Number,
    submission_date: Date,        
});

const Submission = db.models.Submission || db.model('Submission', SubmissionSchema, 'submissions');
module.exports = Submission;
