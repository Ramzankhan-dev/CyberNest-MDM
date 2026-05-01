const bcrypt = require("bcrypt");

const {
    findOwnerByEmail,
    createOwner
} = require("../models/owner.model");

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

module.exports = {
    registerOwner
};