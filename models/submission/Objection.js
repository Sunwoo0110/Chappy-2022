const mongoose = require('mongoose');
const db = mongoose.connection.useDb("submission");

const ObjectionSchema = new mongoose.Schema({
    submission_id: mongoose.Schema.Types.ObjectId,
    date: Date,
    secret: Boolean,
    title: String,
    content: String,
    check: {
        type: Boolean,
        default: false,
    },            
});

const Objection = db.models.Objection || db.model('Objection', ObjectionSchema, 'objections');
module.exports = Objection;
