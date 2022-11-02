const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    studentID: {
        type: Number,
        required: true
    },
    dateEntered: {
        type: Date,
        required: true
    }});

module.exports = mongoose.model('Student', studentSchema);