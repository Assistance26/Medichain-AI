require("dotenv").config();
const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Secure CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://YOUR_FRONTEND_URL"]; // Update with frontend URL
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("⚠️ CORS Error: Origin Not Allowed!"));
            }
        },
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

// ✅ Middleware to parse JSON requests
app.use(express.json());
    
// ✅ Twilio Video Call Routes
app.use("/api/", videoRoutes);

// 🌍 Health Check Route
app.get("/", (req, res) => {
    res.json({ success: true, message: "🚀 Express + Twilio Video Backend is Running!" });
});

// 🌐 Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Unexpected Error:", err.message);
    res.status(500).json({ success: false, error: "Something went wrong!" });
});

// 🚀 Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
