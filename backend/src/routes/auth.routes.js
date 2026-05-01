const express = require("express");

const router = express.Router();

const {
    registerOwner
} = require("../controllers/auth.controller");

router.post("/register", registerOwner);

module.exports = router;