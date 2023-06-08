const mongoose = require('mongoose');

const {Schema}=mongoose;
const instructorSchema = new Schema({
        Id: {type: String,default:0 ,required: false},
        email: {type: String, required: true},
        password: {type:String, required:true},
        instructorName: {type: String, required: true},
        // courseTeaching: {type: mongoose.SchemaTypes.ObjectId, ref:"Course"},
        phone: {type: String, required: true},
        gender: {type: String, required: true},
        address: {city: String, country:String ,homePhone:String, home:String}
       

},

        {timestamps: true}

);

    const Instructor = mongoose.model('Instructor', instructorSchema);
    module.exports = Instructor;