import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
    title: String,
    public: Boolean,
    date: String,
})

module.exports = mongoose.models.Exam || mongoose.model('Exam', ExamSchema)
