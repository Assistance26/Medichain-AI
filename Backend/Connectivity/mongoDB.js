const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    appointmentAt:{
        type: String,
        required: false
    },
    appointmentWith:{
        type: String,
        required: false
    }
})

const DoctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    number:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    licenseNumber:{
        type: String,
        required: true
    },
    Experience:{
        type: String,
        required: true,
    },
    publications:{
        type:String,
        required: true
    },
    appointmentAt:{
        type:[String],
        required: false
    },
    appointmentWith:{
        type:[String],
        required: false
    }

})

const User = new mongoose.model('Patient', UserSchema);
const Doctor = new mongoose.model('Doctor', DoctorSchema);

module.exports = {Doctor, User};