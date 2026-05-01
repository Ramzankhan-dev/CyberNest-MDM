const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const enrollmentRoutes =require("./routes/enrollment.routes");
const deviceRoutes =require("./routes/device.routes");
const commandRoutes =require("./routes/command.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CyberNest Backend Running"
    });
});

// Routes
app.use("/api/auth", authRoutes);

//enrollment
app.use("/api/enrollment", enrollmentRoutes);

//device detail
app.use("/api/device",deviceRoutes);

//commands 
app.use("/api/command",commandRoutes);

module.exports = app;