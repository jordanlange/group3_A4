const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());

// Mongoose package
const mongoose = require('mongoose');
const PORT = 1200;
// const dbURL = "mongodb+srv://admin:Password1@cluster0.zkxltog.mongodb.net/?retryWrites=true&w=majority";
const dbURL = "mongodb+srv://admin:Underling666@cluster0.zkxltog.mongodb.net/test";

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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.get('/', (req, res) => {
    return res.status(200).json("(message: OK)");
})

// the 'getAllStudents' route
app.get('/getAllStudents', (req, res) => {
    try {
        return res.status(200).json(Student);
    }
    catch {
        return res.status(500);
    }
});

app.post('/addStudent', (req, res) => {
    try {
        let newStudent = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID,
            dateEntered: req.body.dateEntered
        }
        Student(newStudent).save(); // .then(c => {
            return res.status(200).json(`New student added named ${fname} ${lname} `);
        // });
        
        
    } catch {
        return res.status(500).json('message: failed to add student');
    };
});

/*
// the 'addStudent' route
app.post('/addStudent', (req, res) => {
    try {
        let newStudent = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID,
            dateEntered: req.body.dateEntered
        }
        console.log(newStudent);
        return res.status(200).json(`Added new student successfully`);

        } catch {
            return res.status(500).json('message: failed to add student');
        }
});
*/


