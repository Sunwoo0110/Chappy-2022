const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const AssignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    example: String,
    constraint: String,
    base_code: String, // 기본 코드
    reference_code: String, 
    language: String,
    testcase: Array,
    created_at: Date,
    open_at: Date,
    closing_at: Date,
    type: Number, // 0: 과제 1: 퀴즈 2: 중간 3: 기말
    is_ready: {
        type: Boolean, // 오픈 가능 여부 False: 임시저장, True: 오픈
        default: false,
    },
    is_opened: {
        type: Boolean, // 학생 화면에 보이는지 여부 False: 비공개, True: 공개
        default: false,
    },
    weeks: Number,
    lecture_id: mongoose.Schema.Types.ObjectId,
    professor_id: mongoose.Schema.Types.ObjectId,
});

const Assignment = db.models.Assignment || db.model('Assignment', AssignmentSchema, 'assignments');
module.exports = Assignment;
