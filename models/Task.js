import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema)
