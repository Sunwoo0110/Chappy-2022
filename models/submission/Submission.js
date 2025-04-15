const mongoose = require('mongoose');
const db = mongoose.connection.useDb("submission");

const SubmissionSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    lecture_id: mongoose.Schema.Types.ObjectId,
    type: Number, // 0: 과제 1: 퀴즈 2: 중간 3: 기말
    ref_id: mongoose.Schema.Types.ObjectId,
    user_code: String,
    submission_state: Number, // 0: 임시저장 1: 제출
    submission_date: Date,         
});

const Submission = db.models.Submission || db.model('Submission', SubmissionSchema, 'submissions');
module.exports = Submission;
