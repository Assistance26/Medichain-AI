const winston = require("winston");
const { createLogger, format, transports } = winston;
require("winston-daily-rotate-file"); // Optional: For log rotation

// Custom log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // Captures error stack trace
    format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

// Console transport with colors
const consoleTransport = new transports.Console({
    format: format.combine(format.colorize(), logFormat),
});

// File transport (Daily rotating logs)
const fileTransport = new transports.DailyRotateFile({
    filename: "logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "30d", // Keep logs for 30 days
    level: "info",
});

// Create logger instance
const logger = createLogger({
    level: "info",
    format: logFormat,
    transports: [consoleTransport, fileTransport], // Multiple transports
});

// Export logger
module.exports = logger;

