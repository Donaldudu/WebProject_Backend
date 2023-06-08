const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({


    courseCode:{
        type: String,
        required: true,
    },
    courseName:{
        type: String,
        required: true,
    },
    creditHour:{
        type: Number,
        required: true,
    },
    courseType:{
        type: String,
        required: true,
    },
    courseStatus:{
        type: String,
        default: "NR",
        required: false,
    },
},
{
    timestamps: true,
}
)
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
