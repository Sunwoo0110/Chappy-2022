const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const FeedbackSchema = new Schema(
{
       
},
)

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
