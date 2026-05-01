const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const {
    generateEnrollmentCode
} = require(
    "../controllers/enrollment.controller"
);

router.post(
    "/create",
    verifyToken,
    generateEnrollmentCode
);

module.exports = router;