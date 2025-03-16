const express = require("express");

const chatbotRoutes = require("./chatbotRoutes");
const sentimentRoutes = require("./sentimentRoutes");

const router = express.Router();

// ✅ Removed healthRoutes
router.use("/chatbot", chatbotRoutes);
router.use("/sentiment", sentimentRoutes);

module.exports = router;
