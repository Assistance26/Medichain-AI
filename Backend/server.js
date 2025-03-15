require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressWs = require("express-ws");
const bodyParser = require("body-parser");
const net = require('net');
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { Doctor, User } = require("./Connectivity/mongoDB");

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
        const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity });
        token.addGrant(new VideoGrant({ room }));
        res.json({ token: token.toJwt() });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Signup with Email Notification
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (await User.findOne({ email })) return res.json({ status: "User Already Exists" });
        const user = await User.create({ email, password });
        sendEmail(email, "Welcome to Medichain AI", "Thank you for signing up!");
        res.json({ status: "User Created", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Doctor Signup with Email Notification
app.post("/DoctorSignIn", async (req, res) => {
    const { email, name, number, specialization, licenseNumber, experience, publications, password } = req.body;
    try {
        if (await Doctor.findOne({ email })) return res.json({ status: "Account Already Exists" });
        const doctor = await Doctor.create({ name, email, number, specialization, licenseNumber, experience, publications, password });
        sendEmail(email, "Doctor Registration Successful", `Dear Dr. ${name}, your account has been created successfully.`);
        res.json({ status: "Created Successfully", doctor });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch Doctors
app.get("/fetchDoctors", async (_req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json({ status: doctors.length ? "fetched" : "No doctors record", doctors });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
