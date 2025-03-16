const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
<<<<<<< HEAD
        type: String,
        required: true
    },
    password:{
        type: String,
=======
        type:String,
        required: true
    },
    password:{
        type:String,
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
        required: true
    },
    appointmentAt:{
        type: String,
        required: false
    },
    appointmentWith:{
        type: String,
        required: false
<<<<<<< HEAD
    }
})
=======
    },
    timeSlot:{
        type: String,
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
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715

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
<<<<<<< HEAD
        type:[String],
        required: false
    },
    appointmentWith:{
        type:[String],
        required: false
=======
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
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
    }

})

const User = new mongoose.model('Patient', UserSchema);
const Doctor = new mongoose.model('Doctor', DoctorSchema);
<<<<<<< HEAD

module.exports = {Doctor, User};
=======
const Admin = new mongoose.model('Admin', adminSchema);
module.exports = {Doctor, User, Admin};
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
