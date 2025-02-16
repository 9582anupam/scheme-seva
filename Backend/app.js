import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js"; // Main routes file

const app = express();

// Middleware Setup
const corsOptions = {
    origin: ["https://schemesevagov.vercel.app", "http://localhost:3000", "https://schemeseva-blond.vercel.app"], // Allow your frontend domain and others
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable cookies in requests and responses
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json()); // Parse JSON requests
// app.use("/", (req, res) => {
//     res.json({ message: "Hello from the backend!" });
// })
// Declare API routes
app.use("/api", apiRoutes); // Attach all API routes

// health check api
app.get("/", (req, res) => {
    res.send("API is runningg");
});

export { app };
