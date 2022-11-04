// add requirements
const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());

// Mongoose package (new this week)
const mongoose = require('mongoose');

// set port to 1200 per assignment instructions
const PORT = 1200;

// MongoDB connection string pointing to db named 'G3A4'
const dbURL = "mongodb+srv://admin:Underling666@cluster0.zkxltog.mongodb.net/G3A4";

// connect to MongoDB
mongoose.connect(dbURL,
    {
        useNewURLParser: true,
        useUnifiedTopology: true
    });

// Mongoose connection
const db = mongoose.connection;

// Handle DB error, display connection
db.on('error', () => {
    console.error.bind(console, 'connection error: ');
});
db.once('open', () => {
    console.log('MongoDB Connected');
});

// Schema model declaration
require('./Models/Student');
require('./Models/Course');

const Student = mongoose.model('Student');
const Course = mongoose.model('Course');

// index route; proves server connection is up and running and Postman works
app.get('/', (req, res) => {
    return res.status(200).json("(message: OK)");
});

// ##############################################################################
// The ADDSTUDENT route contoller
// ##############################################################################
app.post('/addStudent', async (req, res) => {
    try {
        let student = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID,
            dateEntered: req.body.dateEntered
        }
        await Student(student).save().then(e => {
            return res.status(201).json('Student Added');
        })

    } catch {
        return res.status(500).json('message: failed to add student -- bad data');
    }
});

// ##############################################################################
// The GETALLSTUDENTS route contoller
// ##############################################################################
app.get('/getAllStudents', async (req, res) => {
    try {
        let students = await Student.find({}).lean();
        return res.status(200).json(students);
    } catch {
        return res.status(500).json('message: failed to get students');
    }
});

// ##############################################################################
// The FINDSTUDENT route contoller
// ##############################################################################
app.post('/findStudent', async (req, res) => {
    try {
    let oneStudent = {
        lname: req.body.lname
        }
    var result = await Student.findOne({ lname: oneStudent.lname });
    return res.status(200).json(result);
    } catch {
        return res.status(500).json('message: failed to find student match');
    }
});

// ##############################################################################
// The ADDCOURSE route contoller
// ##############################################################################
app.post('/addCourse', async (req, res) => {
    try {
        let course = {
            courseInstructor: req.body.courseInstructor,
            courseCredits: req.body.courseCredits,
            courseID: req.body.courseID,
            courseName: req.body.courseName,
            dateEntered: req.body.dateEntered
        }
        await Course(course).save().then(e => {
            return res.status(201).json('Course Added');
        })

    } catch {
        return res.status(500).json('message: failed to add course -- bad data');
    }
});

// ##############################################################################
// The GETALLCOURSES route contoller
// ##############################################################################

app.get('/getAllCourses', async (req, res) => {
    try {
        let courses = await Course.find({}).lean();
        return res.status(200).json(courses);
    } catch {
        return res.status(500).json('message: failed to get courses');
    }
});

// ##############################################################################
// The FINDCOURSE route contoller
// ##############################################################################
app.post('/findCourse', async (req, res) => {
    try {
    let oneCourse = {
        courseID: req.body.courseID
        }
        var result = await Course.findOne({ courseID: oneCourse.courseID });
        return res.status(200).json(result);
    } catch {
        return res.status(500).json('message: failed to find course match');
    }
});

// listening in on port 1200 for any activity -- SSSSHHHHHHH!!!!
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


