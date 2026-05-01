const express = require("express");
const cors = require("cors");

const authRoutes =
require("./routes/auth.routes");

const enrollmentRoutes =
require("./routes/enrollment.routes");

const deviceRoutes =
require("./routes/device.routes");

const commandRoutes =
require("./routes/command.routes");

const app = express();


// CORS configuration
app.use(
    cors({
        origin: [
            "http://localhost:3000"
        ],
        credentials: true
    })
);


// Middleware
app.use(express.json());


// Health Check
app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
        "CyberNest Backend Running"
    });

});


// Routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/enrollment",
    enrollmentRoutes
);

app.use(
    "/api/device",
    deviceRoutes
);

app.use(
    "/api/command",
    commandRoutes
);


module.exports = app;