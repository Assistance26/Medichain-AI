const express = require("express");
const connectDB = require('./Connectivity/connection');
const {Doctor, User} = require('./Connectivity/mongoDB');

const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors())
app.use(express.json());

connectDB();

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const connection = await User.findOne({email});
        if(connection)
            res.json({status:"User Already Exists"});
        else{
            const user = await User.create({email: email, password: password});
            res.json({status:"User Created", user:user});
        }
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/login', async(req, res) => {
    const {email, password} = req.query;
    console.log(email,password);
    try{
        const check = await User.findOne({email});
        console.log(check);
        if(check){
        console.log("good code");
        res.json({status:"User found", user: check});
        }
        else
            res.json({status:"Does not exists"});
    }
    catch(e){
        res.status(500).json({error:"Internal Server Error"});
    }
});


app.post('/DoctorSignIn', async (req, res) => {
    const {email, name, number, specialization, licenseNumber, experience, publications, password} = req.body;
    console.log(email);
    const check = await Doctor.findOne({email});
    try{
        if(check){
            console.log(check);
            return res.json({status:"Account Already Exists"});
        }
        else{
            const doctor = await Doctor.create({
        name: name,
        email: email,
        number: number,
        specialization: specialization,
        licenseNumber: licenseNumber,
        Experience: experience,
        publications: publications,
        password: password
});
     return res.json({status:"Created Successfully", doctor: doctor});
        }
    }
    catch(e){
    return res.status(400).json({status:"Internal Server Error"});
    }
})

app.get('/fetchDoctors', async (req, res) => {
    const find = await Doctor.find();
    if(find){
        res.json({status:"fetched", doctors: find});
        console.log(find);
    }
    else{
        res.json({status:"No doctors record"});
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
