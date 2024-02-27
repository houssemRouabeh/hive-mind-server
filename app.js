// Modules import
import express from "express";
import { rooter } from "./routes/auth/authRoots.js";
import globalErrorHandler from "./middlewares/errorHandlerMiddleware.js";

// Initializing Express application
const app = express();

// Setting up middleware to parse JSON data in the request body
app.use(express.json());
// Importing routes
app.use("/auth", rooter);

// Global error handler
app.use(globalErrorHandler);

export default app;
