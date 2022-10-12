/** /models/Testcase.js **/

const mongoose = require('mongoose');
const db = mongoose.connection.useDb("lecture");

const { Schema, Types } = mongoose;

const TestCaseSchema = new Schema(
{
    assignment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    testnumber: {
        type: Number,
        required: true,
        trim: true
    },
    is_open: {
        type: Boolean,
        required: false,
        trim: true
    },
    input:  {
        type: Array,
        required: false,
        trim: false
    },
    output: {
        type: Array,
        required: false,
        trim: false
    }
},
)

const TestCase = db.models.TestCase || db.model('TestCase', TestCaseSchema);
module.exports = TestCase;