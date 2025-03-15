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
    const { name, email, password } = req.body;

    try {
       
        const connection = await User.findOne({email});
        if(connection)
            res.json({status:"User Already Exists"});
        else{
            const user = await User.create({name: name, email: email, password: password});
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
        const checkDoctor = await Doctor.findOne({email});
        console.log(check);
        if(check){
        console.log("User Login");
        res.json({status:"User found", user: check});
        }
        else if(checkDoctor){
            console.log("Doctor Login");
            console.log(checkDoctor);
        res.json({status:"Doctor found", user: checkDoctor});
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
    }
    else{
        res.json({status:"No doctors record"});
    }
})

app.get('/search', async (req, res) => {
    const {name} = req.query;
    try{
    const find = await Doctor.findOne({name});
    console.log(find);
    if(find){
        res.json({status:"Doctor Found", doctor: find});
        console.log("Doctor", find);
    }
    else
        res.json({status:"Doctor not found"});
}
catch(e){
    res.status(400).json({error:"Internal Server Error"});
}
})

app.post('/appointment', async (req, res) => {
    const { Docname,Patientname, appointmentDate} = req.body;
    console.log(Docname,":",appointmentDate,"with:",Patientname);
    try{
    const fix = await Doctor.findOne({name: Docname});
    if(fix){
        const updated = await Doctor.findOneAndUpdate({name: Docname},{
            
                    $push:{
                        appointmentWith: [Patientname], appointmentAt: [appointmentDate]
                    }
                },
                    { new: true }
                );
        const userUpdate = await User.findOneAndUpdate({name: Patientname},{
            $set: {
                appointmentAt: appointmentDate,
                appointmentWith: Docname
            }
        },
    { new: true}
    )
        res.json({status:"fixed", date: updated});
    }
    else
        res.json({status:"Some technical Error"});
    }
    catch(e){
        res.status(400).json({status:"Internal Server Error"});
    }
})

app.get('/fetchDates', async (req, res) => {
    console.log("Route hit: /fetchDates"); // Debugging step

    try {
        const fetch = await Doctor.find({}, "appointmentAt appointmentWith");
        console.log("Fetched Data:", fetch); // Debugging step

        if (fetch.length > 0) {
            res.json({ status: "fetched", dates: fetch });
        } else {
            res.json({ status: "No appointments found" });
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ status: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
