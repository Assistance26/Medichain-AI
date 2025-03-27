
const express = require("express");
const { getToken } = require("../controllers/videoController");

const router = express.Router();

/**
 * 📡 POST /api/token
 * 🎥 Generate or Retrieve Twilio Video Token
 */
router.post("/api/token", getToken);

module.exports = router;
