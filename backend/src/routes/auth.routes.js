const express = require("express");
const verifyToken =require("../middleware/auth.middleware");
const router = express.Router();


const {registerOwner, loginOwner, getOwnerProfile} = require("../controllers/auth.controller");

router.post("/register", registerOwner);

router.post("/login", loginOwner);

router.get("/profile", verifyToken, getOwnerProfile);

module.exports = router;