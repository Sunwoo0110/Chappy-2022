/** /models/Testcase.js **/

const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const TestCaseSchema = new Schema(
{
    testnumber: {
        type: Number,
        required: true,
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

const TestCase = mongoose.models.TestCase || mongoose.model('TestCase', TestCaseSchema);

module.exports = TestCase;