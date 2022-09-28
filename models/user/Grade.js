const mongoose = require('mongoose');
const db = mongoose.connection.useDb("user");

const GradeSchema = new mongoose.Schema(
{
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    lecture_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    grade: {
        type: Number,
    },
},
);

const Grade = db.models.Grade || db.model('Grade', GradeSchema, 'grades');
module.exports = Grade;
