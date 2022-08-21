const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const LessonSchema = new mongoose.Schema({
    lecture_id: mongoose.Schema.Types.ObjectId,
    check_attend: Boolean,
    closing_at: Date,
    created_at: Date,
    open_at: Date,
    title: String,
    type: Number,
    weeks: Number,    
});

const Lesson = db.models.Lesson || db.model('Lesson', LessonSchema, 'lessons');
module.exports = Lesson;
