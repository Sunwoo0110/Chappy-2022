const mongoose = require('mongoose');
const db = mongoose.connection.useDb("submission");

const GradeSchema = new mongoose.Schema({
    submission_id: mongoose.Schema.Types.ObjectId,
    total_score: Number || null,
    score: Object,
    deduction: Object,
});

const Grade = db.models.Grade || db.model('Grade', GradeSchema, 'grades');
module.exports = Grade;
