const express = require("express");
const sentimentController = require("../controllers/sentimentController");

const router = express.Router();

// ✅ Removed authMiddleware, keeping sentiment analysis functionality
router.post("/analyze", sentimentController.analyzeMood);

module.exports = router;
