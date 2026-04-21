import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Database Connection (You should create this file)
import connectDB from "./config/mongoose-connection.js";

// Routes
import indexRoutes from "./routes/index.routes.js";

dotenv.config();
connectDB(); // Initialize Mongoose

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Security & Parsing Middleware
app.use(helmet()); // Protects against common web vulnerabilities
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session & Flash (Required for OTP & Auth messages)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);
app.use(flash());

// Global Variables for EJS (to show error/success messages)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/user", indexRoutes);
app.listen( 3000, () => {
  console.log(`Server running at http://localhost:3000`);
});