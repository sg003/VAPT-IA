const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
})


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;