const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["Patient", "Doctor"],
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


// const mongoose = require("mongoose");

// // ✅ Appointment Schema (Reused in both User & Doctor)
// const appointmentSchema = new mongoose.Schema({
//   appointmentWith: {
//     type: String, // Doctor name or ID
//     required: true,
//   },
//   appointmentAt: {
//     type: String, // Date of the appointment
//     required: true,
//   },
//   timeSlot: {
//     type: String, // Time slot for the appointment
//     required: true,
//   },
// });

// // ✅ User Schema (Patient)
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["patient", "doctor", "admin"],
//     default: "patient",
//   },
//   // ✅ Array of Appointments
//   appointments: [appointmentSchema],
// });

// // ✅ Admin Schema
// const adminSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// // ✅ Doctor Schema
// const DoctorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   number: {
//     type: String,
//     required: true,
//   },
//   specialization: {
//     type: String,
//     required: true,
//   },
//   licenseNumber: {
//     type: String,
//     required: true,
//   },
//   Experience: {
//     type: String,
//     required: true,
//   },
//   publications: {
//     type: String,
//     required: true,
//   },
//   approval: {
//     type: String,
//     enum: ["pending", "approved", "denied"],
//     default: "pending",
//   },
//   // ✅ Array of Appointments for Doctor
//   appointments: [appointmentSchema],
// });

// // ✅ Define Models
// const User = mongoose.model("Patient", UserSchema);
// const Doctor = mongoose.model("Doctor", DoctorSchema);
// const Admin = mongoose.model("Admin", adminSchema);

// module.exports = { Doctor, User, Admin };
