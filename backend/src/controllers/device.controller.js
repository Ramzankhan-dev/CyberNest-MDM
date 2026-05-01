const {
    findEnrollmentCode,
    markCodeUsed
} = require(
    "../models/enrollment.model"
);

const {
    createDevice,
    findDeviceById
} = require(
    "../models/device.model"
);

const registerDevice = async (
    req,
    res
) => {

    try {

        const {
            enrollment_code,
            device_name,
            device_id,
            android_version,
            battery_level,
            network_type
        } = req.body;

        // Verify enrollment code
        const codeResult =
            await findEnrollmentCode(
                enrollment_code
            );

        if (
            codeResult.rows.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                "Invalid enrollment code"
            });

        }

        // Check device already exists
        const existingDevice =
            await findDeviceById(
                device_id
            );

        if (
            existingDevice.rows.length > 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                "Device already registered"
            });

        }

        const ownerId =
            codeResult.rows[0]
            .owner_id;

        // Save device
        const deviceResult =
            await createDevice(
                ownerId,
                device_name,
                device_id,
                android_version,
                battery_level,
                network_type
            );

        // Mark code used
        await markCodeUsed(
            enrollment_code
        );

        return res.status(201).json({
            success: true,
            message:
            "Device registered successfully",
            data:
            deviceResult.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
            error.message
        });

    }

};

module.exports = {
    registerDevice
};