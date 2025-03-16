const express = require("express");
const chatbotController = require("../controllers/chatbotController");

const router = express.Router();

// ✅ Updated for Hugging Face API
router.post("/query", async (req, res) => {
    const { message, persona } = req.body;
    console.log("📝 Received chat request:", { message, persona });

    if (!message) {
        console.log("❌ Missing message in request");
        return res.status(400).json({ success: false, error: "Message is required" });
    }

    try {
        const result = await chatbotController.chatbotQuery(req, res);
        console.log("✅ Chat response sent successfully");
        return result;
    } catch (error) {
        console.error("❌ Error in chat route:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Internal server error",
            details: error.message 
        });
    }
});

console.log("✅ Chatbot routes loaded at /api/chatbot");

module.exports = router;
