require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressWs = require("express-ws");
const bodyParser = require("body-parser");
const net = require('net');
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { Doctor, User, Admin } = require("./Connectivity/mongoDB");
const jwt = require('jsonwebtoken')
// Initialize Express app with WebSocket support
const app = express();
expressWs(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path}`, {
        body: req.body,
        query: req.query,
        headers: req.headers
    });
    next();
});

// Import Routes
const chatbotRoutes = require("./routes/chatbotRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/sentiment", sentimentRoutes);

// Twilio Credentials
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to Send Email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email error:", error);
    }
};

// Email Sending Route
app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) return res.status(400).json({ error: "Missing required fields." });
    try {
        await sendEmail(to, subject, message);
        res.status(200).json({ status: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Twilio Token Route
app.post("/api/token", (req, res) => {
    const { identity, room } = req.body;
    if (!identity || !room) return res.status(400).json({ error: "Identity and Room Name are required!" });
    try {
        // const uniqueIdentity = `${identity}-${roomName}`;
        const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity});
        token.addGrant(new VideoGrant({ room }));
        res.json({ token: token.toJwt() });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/login', async(req, res) => {
    const {email, password} = req.query;
    console.log(email,password);
    try{
        const check = await User.findOne({password});
        const checkDoctor = await Doctor.findOne({password});
        const checkAdmin = await Admin.findOne({password});
        console.log(check);
        if(check){
            const user = {name:check.name, email: check.email, password: check.password}
            const token = jwt.sign(user, 'iamFJ', {expiresIn:'1h'});
            console.log("User Login");
            console.log(check);
            res.json({status:"User found", user: check, token: token});
        }
        else if(checkDoctor){
            const user = {name:checkDoctor.name, email: checkDoctor.email, password: checkDoctor.password}
            const token = jwt.sign(user, 'iamFJ', {expiresIn:'1h'});
            console.log("Doctor Login");
            console.log(checkDoctor);
            res.json({status:"Doctor found", user: checkDoctor, token: token});
        }
        else if(checkAdmin){
            const user = {name:checkAdmin.name, email: checkAdmin.email, password: checkAdmin.password}
            const token = jwt.sign(user, 'iamFJ', {expiresIn:'1h'});
            console.log("Admin Login");
            console.log(checkAdmin);
            res.json({status:"Admin found", user: checkAdmin, token: token});
        }
        else
        res.json({status:"Does not exists"});
    }
    catch(e){
        res.status(500).json({error:"Internal Server Error"});
    }
});

// User Signup with Email Notification

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const admin = await Admin.findOne({password});
        const doctor = await Doctor.findOne({password});
        const connection = await User.findOne({password});
        if(connection)
            res.json({status:"User Already Exists"});
        else if(admin || doctor){
            return res.json({status:"Use different password"});
        }
        else{
            const user = await User.create({name: name, email: email, password: password});
            res.json({status:"User Created", user:user});
        }
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/DoctorSignUp", async (req, res) => {
    const { email, name, number, specialization, licenseNumber, experience, publications, password } = req.body;
    const user = await User.findOne({password});
    const admin = await Admin.fineOne({password});
    try {
        if (await Doctor.findOne({ password })) 
            return res.json({ status: "Account Already Exists" });
        else if(user || admin){
            return res.json({ status: "Use different password" });
        }
        const doctor = await Doctor.create({ name, email, number, specialization, licenseNumber, Experience: experience, publications, password, approval: "pending" });
        sendEmail(email, "Doctor Registration Successful", `Dear Dr. ${name}, your account has been created successfully.`);
        res.json({ status: "Created Successfully", doctor });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/adminSignup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({password});
        const doctor = await Doctor.findOne({password});
        const connection = await Admin.findOne({email});
        if(connection)
            res.json({status:"User Already Exists"});
        else if(user || doctor){
            return res.json({status:"Use different password"});
        }
        else{
            const user = await Admin.create({name: name, email: email, password: password});
            res.json({status:"User Created", user:user});
        }
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

function Authentication(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(500).json({error:"Internal Error"});
    }
    const token = authHeader.split(' ')[1];
    if(!token)
        return res.status(401).json({ message: "Token is missing from Authorization header" });
    jwt.verify(token, 'iamFJ', (err, user) => {
        if(err)
            return res.status(505).json({error:"Not Found"});
        req.user = user;
        req.token = token;
        next();
    })
}

app.get('/authenticate',Authentication, async (req,res) => {
   if(req.user)
    res.json({status:"User Authenticated", user:req.user});
})

app.get('/pendingDoctors', async (req, res) => {
    try {
        const find = await Doctor.find({ approval: "pending" });
        if (find.length > 0) {
            console.log(find);
            res.json({ status: "fetched", doctors: find }); // Change `pending` to `doctors`
        } else {
            res.json({ status: "not_found", doctors: [] });
        }
    } catch (e) {
        console.error("Error fetching pending doctors:", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/updateDoctorStatus', async (req, res) => {
    const {doctorId, status} = req.body;
    try{
        const check = await Doctor.findById(doctorId);
        if(check){
            const updatedDoctor = await Doctor.findByIdAndUpdate(
                doctorId, 
                { approval: status }, 
                { new: true }
            );
            res.json({status:'updated', new: updatedDoctor});
        }
        else
        console.log("Some issue");
    }
    catch(e){
        res.status(400).json({error:"Internal Server error"});
    }
})
// Doctor Signup with Email Notification

// Fetch Doctors
app.get("/fetchDoctors", async (_req, res) => {
    try {
        const doctors = await Doctor.find({approval: "approved"});
        res.json({ status: doctors.length ? "fetched" : "No doctors record", doctors });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

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
    const { Docname, PatientName, timeSlot, appointmentAt } = req.body;
    console.log(Docname, ":", appointmentAt, ",", timeSlot, "with:", PatientName);

    try {
        const fix = await Doctor.findOne({ name: Docname });

        if (!fix) {
            console.log("Doctor not found:", Docname);
            return res.json({ status: "Doctor not found" });
        }

        const updated = await Doctor.findOneAndUpdate(
            { name: Docname },
            {
                $push: {
                    appointmentWith: PatientName,  // ✅ Fixed push syntax
                    appointmentAt: appointmentAt,
                    timeSlot: timeSlot
                }
            },
            { new: true }
        );

        const userUpdate = await User.findOneAndUpdate(
            { name: PatientName },
            {
                $set: {
                    appointmentAt: appointmentAt,
                    timeSlot: timeSlot,
                    appointmentWith: Docname
                }
            },
            { new: true }
        );

        if (!userUpdate) {
            console.log("User not found:", PatientName);
            return res.json({ status: "User not found" });
        }

        res.json({ status: "fixed", date: updated });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ status: "Internal Server Error" });
    }
});



app.get('/fetchDates', async (req, res) => {
    const {name} = req.query;
    console.log("Route hit: /fetchDates", name); // Debugging step

    try {
        // Fetch doctors where appointmentAt, appointmentWith, and timeSlot are not empty
        const fetch = await Doctor.findOne({name});

        console.log("Fetched Data:", fetch); // Debugging step

        if (fetch) {
            res.json({ status: "fetched", dates: fetch });
        } else {
            res.json({ status: "No appointments found" });
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ status: "Internal Server Error" });
    }
});


app.get('/UserWithAppointment', async (req, res) => {
    const {email} = req.query;
    console.log("Route hit: /UserWithAppointment", email); // Debugging step

    try {
        // Fetch doctors where appointmentAt, appointmentWith, and timeSlot are not empty
        const userWithAppointment = await User.findOne({email});
        console.log("Fetched Data:", userWithAppointment); // Debugging step

        if (fetch) {
            res.json({ status: "fetched", appointment: userWithAppointment });
        } else {
            res.json({ status: "No appointments found" });
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ status: "Internal Server Error" });
    }
});



// MongoDB Connection & Port Handling
const INITIAL_PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const isPortInUse = (port) => new Promise((resolve) => {
    const server = net.createServer().once('error', () => resolve(true)).once('listening', () => {
        server.close(); resolve(false);
    }).listen(port);
});
const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (await isPortInUse(port)) {
        console.log(`⚠️ Port ${port} is in use, trying ${port + 1}...`);
        port++;
    }
    return port;
};

const connectDB = async () => {
    try {
        if (!MONGO_URI) throw new Error("❌ Missing MongoDB URI! Set MONGO_URI in your .env file.");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        const port = await findAvailablePort(INITIAL_PORT);
        const server = app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
        process.on("SIGINT", async () => {
            console.log("🛑 Closing server and MongoDB connection...");
            await mongoose.connection.close();
            server.close(() => {
                console.log("✅ Server shut down gracefully.");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

// Start Server
connectDB();
