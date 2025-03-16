require("dotenv").config();
const twilio = require("twilio");

// ✅ Load Twilio credentials from .env
const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET) {
    console.error("❌ ERROR: Missing Twilio API credentials in .env file.");
    process.exit(1);
}

// module.exports = {
//     TWILIO_ACCOUNT_SID,
//     TWILIO_API_KEY,
//     TWILIO_API_SECRET,
// };
