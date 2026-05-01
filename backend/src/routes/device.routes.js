const express = require("express");

const router =
express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const {
    registerDevice,
    getAllDevices,
    getSingleDevice
} = require(
    "../controllers/device.controller"
);

router.post(
    "/register",
    registerDevice
);

router.get(
    "/all",
    verifyToken,
    getAllDevices
);

router.get(
    "/:id",
    verifyToken,
    getSingleDevice
);

module.exports = router;