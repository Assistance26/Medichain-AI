const NodeCache = require("node-cache");

// ✅ Centralized Token Cache - Tokens expire after 1 hour
const tokenCache = new NodeCache({ stdTTL: 3600 });

module.exports = tokenCache;
