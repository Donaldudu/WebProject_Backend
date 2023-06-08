const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Student = require("./Models/Student")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const cors=require("cors")
app.use(cors())
app.use(express.json())

const MONGODB_URL = process.env.URL;
const port = process.env.port;

const Admin=require("./Routes/Admin")
app.use(Admin)



app.use(express.json())
mongoose
    .connect(MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    })

    app.get("/",(req,res)=>{
        res.send("Home Page")
})

app.listen(port)

