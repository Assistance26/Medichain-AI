const twilio = require("twilio");

// ✅ Load Twilio credentials from environment variables
const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

// ✅ Validate environment variables once
if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET) {
  throw new Error(
    "Twilio credentials are missing! Please set TWILIO_ACCOUNT_SID, TWILIO_API_KEY, and TWILIO_API_SECRET in your environment."
  );
}

// ✅ Generate Twilio Video Token
const generateToken = (identity, room) => {
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  try {
    // ✅ Create a new AccessToken instance
    const token = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
      { identity }
    );

    // ✅ Assign a Video Grant to the token
    const videoGrant = new VideoGrant({ room });
    token.addGrant(videoGrant);

    // ✅ Convert the token to a JWT and return it
    return token.toJwt();
  } catch (error) {
    console.error("❌ Error generating Twilio token:", error);
    throw new Error("Failed to generate Twilio token.");
  }
};

module.exports = generateToken;
