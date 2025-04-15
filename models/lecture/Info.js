const mongoose = require('mongoose');
const { stringifyQuery } = require('next/dist/server/server-route-utils');
const db = mongoose.connection.useDb("lecture");

const InfoSchema = new mongoose.Schema({
    name: String,
    english_name: String,
    professor: String,
    lecture_num: String, 
    open_semester: String, // 개설 학기
    description: String,
    syllabus: Buffer,
    feedback: Boolean, // 피드백 여부
    department: String,
    major: String, 
    lecture_date: String,
    lecture_type: String, 
    is_ready: {
        type: Boolean, // 오픈 가능 여부 False: 임시저장, True: 오픈
        default: false,
    },
    is_opened: {
        type: Boolean, // 학생 화면에 보이는지 여부 False: 비공개, True: 공개
        default: false,
    },
    saved_at: Date,
    user_list: Array,
    classroom: String,
});

const Info = db.models.Info || db.model('Info', InfoSchema, 'info');
module.exports = Info;
