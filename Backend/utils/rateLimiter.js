const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { success: false, message: "Too many requests, please try again later." },
    standardHeaders: true, // Sends `RateLimit-*` headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers (deprecated)
    statusCode: 429, // HTTP status for rate-limited responses
    handler: (req, res, next, options) => {
        console.warn(`⚠️ Rate limit exceeded: ${req.ip} on ${req.originalUrl}`);
        res.status(options.statusCode).json(options.message);
    },
});

module.exports = limiter;
