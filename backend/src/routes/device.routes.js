const express = require("express");

const router =
express.Router();

const verifyToken =
require("../middleware/auth.middleware");

const {
    registerDevice,
    getAllDevices,
    getSingleDevice,
    syncDeviceStatus
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

router.post(
    "/status",
    syncDeviceStatus
);

module.exports = router;