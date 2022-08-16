/** /models/Lecture.js **/

const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const LectureSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    }, 
    englishname: {
        type: String,
    }, 
    professor: {
        type: String,
    },
    classnumber: {
        type: String,
    },
    open: {
        type: String,
    },
    description: {
        type: String,
    }
},
)

const Lecture = mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema);

module.exports = Lecture;