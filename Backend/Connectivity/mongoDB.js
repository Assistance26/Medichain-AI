const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    appointmentAt:{
        type: [String],
        required: false
    },
    appointmentWith:{
        type: [String],
        required: false
    },
    timeSlot:{
        type: [String],
        required: false
    }

})
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

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
        type: [String],
        required: false
    },
    appointmentWith:{
        type: [String],
        required: false
    },
    timeSlot:{
        type: [String],
        required: false
    },
    approval: {
        type: String,
        enum: ["pending", "approved", "denied"],
        default: "pending"
    }

})

const User = new mongoose.model('Patient', UserSchema);
const Doctor = new mongoose.model('Doctor', DoctorSchema);
const Admin = new mongoose.model('Admin', adminSchema);
module.exports = {Doctor, User, Admin};