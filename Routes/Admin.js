const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Student=require("../Models/Student")
const Course=require("../Models/Course")
// const jwt=require("jsonwebtoken")
require("dotenv").config();
const Feedback=require("../Models/FeedbackSchema")
const Instructor=require("../Models/Instructor")
//Auth middleware Code
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const key = process.env.SecretKey;
    if (!token) {
      res.status(200).json({
        success: false,
        message: "Error! Token was not provided.",
      });
    }
    try {
      const decodedToken = jwt.verify(token, key);
      req.token = decodedToken;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
//Router for Feedbacks
router.get("/getfeedbacks", async (req, res) => {
    const result = await Feedback.find({}, { _id: 0 })
      .then((response) => {
        res.send(response);
      })
      .catch({ message: "error" });
});

//Router for Adding Courses

//_________________________
// router.post("/AddCourse", async (req, res, next) => {
//   const st=req.body;
//   console.log(st)
//   try {
//       const student = new Student(st);
//       const result = await student.save();
//       let token;
//       try {
//           token = jwt.sign(
//               {rollNo: st.rollNo,studentName :st.studentName ,email: st.email },
//               process.env.SecretKey,
//               { expiresIn: "1h" }
//               );
//           } catch (err) {
//               const error = new Error("Error! Something went wrong.");
//               next(error);
//           }
//           res
//           .status(201)
//           .json({
//               success: true,
//               data: {
//                   //rollNo:st.rollNo,
//                   token: token
//               },
//           });
//       } catch(err) {
//           console.log("errrrrrrrrrrrr",err)
//       }
//       });

//______________________________________
//Router for Adding Students in database
router.post("/signup", async (req, res, next) => {
    const st=req.body;
    console.log(st)
    try {
        const student = new Student(st);
        const result = await student.save();
        let token;
        try {
            token = jwt.sign(
                {rollNo: st.rollNo,studentName :st.studentName ,email: st.email },
                process.env.SecretKey,
                { expiresIn: "1h" }
                );
            } catch (err) {
                const error = new Error("Error! Something went wrong.");
                next(error);
            }
            res
            .status(201)
            .json({
                success: true,
                data: {
                    //rollNo:st.rollNo,
                    token: token
                },
            });
        } catch(err) {
            console.log("errrrrrrrrrrrr",err)
        }
        });

        //Instructor Router
        
        router.post("/signupInstructor", async (req, res, next) => {
          const it=req.body;
          console.log(it)
          try {
              const instructor = new Instructor(it);
              const result = await instructor.save();
              let token;
              try {
                  token = jwt.sign(
                      {Id: it.Id,instructorName :it.instructorName ,email: it.email },
                      process.env.SecretKey,
                      { expiresIn: "1h" }
                      );
                  } catch (err) {
                      const error = new Error("Error! Something went wrong.");
                      next(error);
                  }
                  res
                  .status(201)
                  .json({
                      success: true,
                      data: {
                          // rollNo:st.rollNo,
                          token: token
                      },
                  });
              } catch(err) {
                  console.log("errrrrrrrrrrrr",err)
              }
              });
              //Admin login code

router.post('/AdminLogin',(req,res)=>{
    const {email,password}=req.body;
    if(email=="admin" && password=="admin"){
        res.status(201).send({success:true})
    }
    else{
        res.status(404).send("Wrong email or password")
    }
})
//Not using the code below
router.get('/getStudents',authMiddleware,(req,res)=>{
    Student.find()
    .then(sArray=>{
        res.json(sArray)
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/studentUpdate',authMiddleware ,async(req,res)=>{
 const {rollNumber,studentName,password,
CGPA,SGPA,batch,degree,section,status,phone
,gender,email,address,gaurdian,} = req.body 
   

   const student = await Student.findOne({rollNumber:rollNumber})
   student.rollNumber=rollNumber; 
   student.studentName=studentName;
   student.password=password;
   student.CGPA=CGPA;
   student.SGPA=SGPA;
   student.batch=batch;
   student.degree=degree;
   student.section=section;
   student.status=status;
   student.phone=phone;
   student.gender=gender;
   student.email=email;
   student.address=address;
   student.gaurdian=gaurdian;


   await student.save()

})

router.post('/AddCourses',authMiddleware ,(req, res) => {
    const newCourse=new Course(req.body)
    newCourse.save().then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  });

  router.delete('/DeleteCourses',authMiddleware ,(req, res) => {
    const courseId = req.body.courseCode;
    Course.deleteOne({courseCode:courseCode}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(404).json(err)
    })
  });


module.exports = router