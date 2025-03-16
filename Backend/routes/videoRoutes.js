const express = require("express");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// 🔑 Generate Twilio Video Token
router.post("/token", (req, res) => {
    console.log("📥 Received token request:", req.body);

    try {
        const { identity, room } = req.body;
        console.log("room, id:",identity,room);
        
        // ✅ Validate request payload
        if (!identity || !room) {
            return res.status(400).json({ success: false, error: "Identity and Room are required" });
        }

        // ✅ Generate JWT Token
        const token = generateToken(identity, room);
        console.log(`✅ Token generated successfully for ${identity} in room: ${room}`);

        res.json({ success: true, token });
    } catch (error) {
        console.error("❌ ERROR: Failed to generate token:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
