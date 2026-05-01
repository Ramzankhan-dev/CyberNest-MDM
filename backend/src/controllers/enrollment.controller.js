const {
    createEnrollmentCode
} = require("../models/enrollment.model");

const generateEnrollmentCode = async (
    req,
    res
) => {

    try {

        const ownerId =
            req.user.id;

        const randomCode =
            "CYBER-" +
            Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        const result =
            await createEnrollmentCode(
                ownerId,
                randomCode
            );

        return res.status(201).json({
            success: true,
            message: "Enrollment code created",
            data: result.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    generateEnrollmentCode
};