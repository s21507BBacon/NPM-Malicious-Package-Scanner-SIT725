//remember to npm install winston
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: 'info',  // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),  // Colorize logs for console readability
    logFormat
  ),
  transports: [
    // Console transport (logs to the terminal)
    new transports.Console(),
    
    // File transport (logs to a file)
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

// Export the logger instance for use in the app
module.exports = logger;

//add to files you want to log
//const logger = require('../utils/logger');

// Example of using the logger
//logger.info('This is an informational message');
//logger.warn('This is a warning message');
//logger.error('This is an error message');
