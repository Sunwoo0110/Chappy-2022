const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const AttendanceSchema = new mongoose.Schema({
    lecture_id: mongoose.Schema.Types.ObjectId,
    lesson_id: mongoose.Schema.Types.ObjectId,
    attendance: Object,
});

const Attendance = db.models.Attendance || db.model('Attendance', AttendanceSchema, 'attendances');
module.exports = Attendance;
