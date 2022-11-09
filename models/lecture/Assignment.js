const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const AssignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    example: String,
    constraint: String,
    base_code: String,
    reference_code: String,
    language: String,
    testcase: Array,
    created_at: Date,
    open_at: Date,
    closing_at: Date,
    type: Number,
    is_ready: {
        type: Boolean,
        default: false,
    },
    is_opened: {
        type: Boolean,
        default: false,
    },
    weeks: Number,
    lecture_id: mongoose.Schema.Types.ObjectId,
    professor_id: mongoose.Schema.Types.ObjectId,
});

const Assignment = db.models.Assignment || db.model('Assignment', AssignmentSchema, 'assignments');
module.exports = Assignment;
