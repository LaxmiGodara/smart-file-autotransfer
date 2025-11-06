import fs from "fs"; // Import the 'fs' (File System) module from Node.js for file operations

// Export the logError function to be used in other modules
export const logError = (errObj) => {
  const logPath = "server/logs/error_log.txt"; // Path to the error log file where errors will be stored

  // Create a log entry: 
  // - Add the current timestamp in ISO format
  // - Convert the error object to a JSON string
  // - Add a newline at the end for readability
  const line = `[${new Date().toISOString()}] ${JSON.stringify(errObj)}\n`;
  
  // Append the log entry to the specified log file.
  // If the file does not exist, it will be created automatically.
  // If it exists, new logs will be added to the end of the file.
  fs.appendFileSync(logPath, line);
};
