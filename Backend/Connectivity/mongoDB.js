// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type:String,
//         required: true,
//         unique: true
//     },
//     password:{
//         type:String,
//         required: true
//     },
//     number:{
//         type: String,
//         required: true
//     },
//     role:{
//         type: String,
//         enum: ["Patient", "Doctor"],
//         required: true
//     },
//     appointmentAt:{
//         type: [String],
//         required: false
//     },
//     appointmentWith:{
//         type: [String],
//         required: false
//     },
//     timeSlot:{
//         type: [String],
//         required: false
//     }
// })
// const adminSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required: true
//     },
//     email:{
//         type:String,
//         required: true
//     },
//     password:{
//         type:String,
//         required: true
//     }
// });

// const DoctorSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     number:{
//         type:String,
//         required:true
//     },
//     specialization:{
//         type:String,
//         required:true
//     },
//     licenseNumber:{
//         type: String,
//         required: true
//     },
//     Experience:{
//         type: String,
//         required: true,
//     },
//     publications:{
//         type:String,
//         required: true
//     },
//     appointmentAt:{
//         type: [String],
//         required: false
//     },
//     appointmentWith:{
//         type: [String],
//         required: false
//     },
//     timeSlot:{
//         type: [String],
//         required: false
//     },
//     approval: {
//         type: String,
//         enum: ["pending", "approved", "denied"],
//         default: "pending"
//     }

// })

// const User = new mongoose.model('Patient', UserSchema);
// const Doctor = new mongoose.model('Doctor', DoctorSchema);
// const Admin = new mongoose.model('Admin', adminSchema);
// module.exports = {Doctor, User, Admin};




const mongoose = require("mongoose");

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Admin"],
    required: true,
  },
  appointments: [
    {
      doctorName: String, // For Patient's record
      appointmentAt: Date,
      timeSlot: String,
    },
  ],
});

// ✅ Admin Schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ✅ Doctor Schema
const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },
  publications: {
    type: String,
    required: true,
  },
  appointments: [
    {
      patientName: String, // For Doctor's record
      appointmentAt: Date,
      timeSlot: String,
    },
  ],
  approval: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
});

// ✅ Export Models
const User = mongoose.model("User", UserSchema);
const Doctor = mongoose.model("Doctor", DoctorSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Doctor, User, Admin };
