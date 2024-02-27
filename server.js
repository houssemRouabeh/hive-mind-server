// Modules import
import * as dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import app from "./app.js";

// Load environment variables from .env file
dotenv.config();

// Define the port for the server, defaulting to 5000 if not specified
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDb();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  // Log the error details
  console.error(`${err.name}: ${err.message}`);

  // Log a message and shut down the server
  console.error("Uncaught Exception occurred! Server is shutting down");
  process.exit(1);
});

// Log the server mode
console.log("Server run on mode", process.env.NODE_ENV);

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on : localhost:${port}/`);
});
