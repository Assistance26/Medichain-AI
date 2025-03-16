const twilio = require("twilio");
// const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = require("../config/twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

const generateToken = (identity, room) => {
    const AccessToken = twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    // ✅ Create a new AccessToken instance
    const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, { identity });

    // ✅ Assign a Video Grant to the token
    token.addGrant(new VideoGrant({ room }));

    // ✅ Convert the token to a JWT
    return token.toJwt();
};

module.exports = generateToken;
