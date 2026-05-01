const bcrypt = require("bcrypt");

const {findOwnerByEmail, createOwner, findOwnerById} = require("../models/owner.model");

const generateToken = require("../utils/generateToken");

const registerOwner = async (req, res) => {

    try {

        const {
            owner_name,
            organization_name,
            email,
            password,
            confirm_password
        } = req.body;

        // Validation
        if (
            !owner_name ||
            !organization_name ||
            !email ||
            !password ||
            !confirm_password
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Email check
        const existingOwner =
            await findOwnerByEmail(email);

        if (existingOwner.rows.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Password hash
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create owner
        const newOwner = await createOwner(
            owner_name,
            organization_name,
            email,
            hashedPassword
        );

        // Token
        const token = generateToken(
            newOwner.rows[0]
        );

        return res.status(201).json({
            success: true,
            message: "Owner registered successfully",
            token,
            owner: newOwner.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const loginOwner = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Validation
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });

        }

        // Check email
        const ownerResult =
            await findOwnerByEmail(email);

        if (ownerResult.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Owner not found"
            });

        }

        const owner =
            ownerResult.rows[0];

        // Password compare
        const isMatch =
            await bcrypt.compare(
                password,
                owner.password
            );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        // Generate token
        const token =
            generateToken(owner);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            owner
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getOwnerProfile = async (req, res) => {

    try {

        const ownerId = req.user.id;

        const ownerResult =
            await findOwnerById(ownerId);

        if (ownerResult.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Owner not found"
            });

        }

        return res.status(200).json({
            success: true,
            owner: ownerResult.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerOwner,
    loginOwner,
    getOwnerProfile
};