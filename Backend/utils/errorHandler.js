const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
    // Extract error details
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    const errorStack = err.stack || "No stack trace available";
    const requestInfo = `${req.method} ${req.originalUrl} from ${req.ip}`;

    // Log detailed error
    logger.error(`🚨 ERROR: ${errorMessage}\n🔍 Request: ${requestInfo}\n📄 Stack: ${errorStack}`);

    // Respond with appropriate error message
    res.status(statusCode).json({
        success: false,
        message: process.env.NODE_ENV === "production" ? "Something went wrong!" : errorMessage,
        ...(process.env.NODE_ENV !== "production" && { stack: errorStack }),
    });
};

module.exports = errorHandler;

