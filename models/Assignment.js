/** /models/Assignment.js **/
const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const AssignmentSchema = new Schema(
{
    title: {
        type: String
    },
    description: {
        type: String
    },
    example: {
        type: String
    },
    constraint: {
        type: String,
    },
    base_code: {
        type: String,
    },
    reference_code: {
        type: String,
    }
})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;