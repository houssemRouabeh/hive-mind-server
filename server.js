// Modules imports
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";

// Initializing Express application, MongoDb and loading environment variables
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDb();

// Using jsonparser middleware
app.use(express.json());

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on : localhost:${port}/`);
});
