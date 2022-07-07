import mongoose from 'mongoose'

const AssignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    example: String,
    constraint: String,
    base_code: String,
    reference_code: String,
})

module.exports = mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema)