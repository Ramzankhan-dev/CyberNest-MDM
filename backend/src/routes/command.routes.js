const express = require("express");

const router =
express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const {
    sendCommand
} = require(
    "../controllers/command.controller"
);

router.post(
    "/send",
    verifyToken,
    sendCommand
);

module.exports = router;