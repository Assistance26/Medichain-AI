// const generateVideoToken = require("../utils/generateToken");

// // ✅ Token Cache (In-Memory)
// const tokenCache = {}; // Stores tokens for active rooms
// const locks = {}; // Store room locks temporarily

// // ✅ Clean up old tokens periodically
// setInterval(() => {
//   const now = Date.now();
//   Object.keys(tokenCache).forEach((roomName) => {
//     if (now - tokenCache[roomName].createdAt > 3600000) {
//       // 1 hour expiry
//       delete tokenCache[roomName];
//       console.log(`🗑️ Token expired and removed for: ${roomName}`);
//     }
//   });
// }, 60000);

// // ✅ Lock Acquisition
// async function acquireLock(roomName) {
//   return new Promise((resolve) => {
//     if (!locks[roomName]) {
//       locks[roomName] = true;
//       resolve();
//     } else {
//       const interval = setInterval(() => {
//         if (!locks[roomName]) {
//           clearInterval(interval);
//           locks[roomName] = true;
//           resolve();
//         }
//       }, 100); // Check every 100ms
//     }
//   });
// }

// // ✅ Release Lock
// async function releaseLock(roomName) {
//   delete locks[roomName];
// }

// // ✅ Get Token API - Returns Same Token for Doctor and Patient
// exports.getToken = async (req, res) => {
//   const { appointmentId, userType, userName } = req.body;

//   // ✅ Validate required parameters
//   if (!appointmentId || !userType || !userName) {
//     return res.status(400).json({
//       success: false,
//       error: "Missing required parameters!",
//       required: ["appointmentId", "userType", "userName"],
//     });
//   }

//   try {
//     // ✅ Normalize and create a consistent room name using appointmentId
//     const roomName = `appointment_${appointmentId}`; // Consistent room name

//     // ✅ Define identity based on userType (doctor/patient)
//     const identity = userType === "doctor" ? `Dr_${userName}` : userName;

//     // ✅ Acquire lock before generating token
//     await acquireLock(roomName);

//     // ✅ Check if token already exists for this room in cache
//     if (tokenCache[roomName]) {
//       console.log(`✅ Returning cached token for: ${roomName}`);
      
//       // ✅ Release lock before returning cached token
//       await releaseLock(roomName);

//       return res.status(200).json({
//         success: true,
//         token: tokenCache[roomName].token,
//         roomName,
//         identity,
//       });
//     }

//     // ✅ Generate New Token if Not Cached
//     console.log(`🔄 Generating new token for: ${roomName}`);
//     const token = generateVideoToken(identity, roomName);

//     // ✅ Cache the Token for Future Use
//     tokenCache[roomName] = {
//       token,
//       createdAt: Date.now(),
//     };

//     // ✅ Release lock after token is generated
//     await releaseLock(roomName);

//     // ✅ Return Generated Token
//     res.json({
//       success: true,
//       token,
//       roomName,
//       identity,
//     });
//   } catch (error) {
//     console.error("❌ Error generating token:", error);

//     // ✅ Release lock in case of an error
//     await releaseLock(roomName);

//     res.status(500).json({
//       success: false,
//       error: "Failed to generate token",
//       details: error.message,
//     });
//   }
// };








// const generateToken = require("../utils/generateToken");
// const NodeCache = require("node-cache");

// // ✅ Token Cache (In-Memory) - Caches tokens for 1 hour
// const tokenCache = new NodeCache({ stdTTL: 3600 }); // 1 hour expiry

// // ✅ Generate or Retrieve Video Token for Doctor and Patient
// exports.getToken = async (req, res) => {
//   const { appointmentId, userType, userName } = req.body;

//   // 🔎 Validate required parameters
//   if (!appointmentId || !userType || !userName) {
//     return res.status(400).json({
//       success: false,
//       error: "Missing required parameters!",
//       required: ["appointmentId", "userType", "userName"],
//     });
//   }

//   try {
//     // 🏷️ Create a unique and consistent room name based on appointmentId
//     const roomName = `appointment_${appointmentId}`.replace(/\s+/g, "_");

//     // 🎭 Define identity based on userType (doctor/patient)
//     const identity = userType === "doctor" ? `Dr_${userName}` : userName;

//     // ✅ Check for cached token to avoid regenerating token
//     const cacheKey = `${roomName}_${identity}`;
//     const cachedToken = tokenCache.get(cacheKey);

//     if (cachedToken) {
//       console.log(`✅ Using cached token for room: ${roomName}, user: ${identity}`);
//       return res.status(200).json({
//         success: true,
//         token: cachedToken,
//         roomName,
//         identity,
//       });
//     }

//     console.log(`🔑 Generating new token for: ${roomName}, user: ${identity}`);

//     // 🎥 Generate a new token using Twilio token generator
//     const jwtToken = generateToken(identity, roomName);

//     // 🔐 Cache the generated token for future use
//     tokenCache.set(cacheKey, jwtToken);

//     console.log(`✅ Token successfully generated for ${identity} in room: ${roomName}`);

//     // 📡 Return generated token and room info to the client
//     res.json({
//       success: true,
//       token: jwtToken,
//       roomName,
//       identity,
//     });
//   } catch (error) {
//     console.error("❌ Error generating token:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to generate token",
//       details: error.message,
//     });
//   }
// };




const generateToken = require("../utils/generateToken");
const tokenCache = require("../utils/cache");

// ✅ Generate or Retrieve Video Token for Doctor and Patient
exports.getToken = async (req, res) => {
  const { appointmentId, userType, userName } = req.body;

  // 🔎 Validate required parameters
  if (!appointmentId || !userType || !userName) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameters!",
      required: ["appointmentId", "userType", "userName"],
    });
  }

  try {
    // 🏷️ Create a unique and consistent room name based on appointmentId
    const roomName = `appointment_${appointmentId}`.replace(/\s+/g, "_");

    // 🎭 Define identity based on userType (doctor/patient)
    const identity = userType === "doctor" ? `Dr_${userName}` : userName;

    // ✅ Check for cached token to avoid regenerating token
    const cacheKey = `${roomName}_${identity}`;
    const cachedToken = tokenCache.get(cacheKey);

    if (cachedToken) {
      console.log(`✅ Using cached token for room: ${roomName}, user: ${identity}`);
      return res.status(200).json({
        success: true,
        token: cachedToken,
        roomName,
        identity,
      });
    }

    console.log(`🔑 Generating new token for: ${roomName}, user: ${identity}`);

    // 🎥 Generate a new token using Twilio token generator
    const jwtToken = generateToken(identity, roomName);

    // 🔐 Cache the generated token for future use
    tokenCache.set(cacheKey, jwtToken);

    console.log(`✅ Token successfully generated for ${identity} in room: ${roomName}`);

    // 📡 Return generated token and room info to the client
    res.json({
      success: true,
      token: jwtToken,
      roomName,
      identity,
    });
  } catch (error) {
    console.error("❌ Error generating token:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate token",
      details: error.message,
    });
  }
};
