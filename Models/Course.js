const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseInstructor: {
        type: String,
        required: true
    },
    courseCredits: {
        type: Number,
        required: true
    },
    courseID: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    dateEntered: {
        type: Date,
        required: true
    }});

module.exports = mongoose.model('Course', courseSchema);