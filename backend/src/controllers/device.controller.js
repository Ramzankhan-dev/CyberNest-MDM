const {
    findEnrollmentCode,
    markCodeUsed
} = require(
    "../models/enrollment.model"
);

const {
    createDevice,
    findDeviceById,
    getDevicesByOwnerId,
    getDeviceById,
    updateDeviceStatus
} = require(
    "../models/device.model"
);


// Pakistan time formatter
const formatToPakistanTime = (
    date
) => {

    if (!date) return null;

    return new Date(date)
        .toLocaleString(
            "en-PK",
            {
                timeZone:
                "Asia/Karachi"
            }
        );

};


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

        const device =
            deviceResult.rows[0];

        device.created_at =
            formatToPakistanTime(
                device.created_at
            );

        return res.status(201).json({
            success: true,
            message:
            "Device registered successfully",
            data:
            device
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
            error.message
        });

    }

};


const getAllDevices = async (
    req,
    res
) => {

    try {

        const ownerId =
            req.user.id;

        const devices =
            await getDevicesByOwnerId(
                ownerId
            );

        const formattedDevices =
            devices.rows.map(
                (device) => ({

                    ...device,

                    created_at:
                    formatToPakistanTime(
                        device.created_at
                    ),

                    last_seen:
                    formatToPakistanTime(
                        device.last_seen
                    )

                })
            );

        return res.status(200).json({
            success: true,
            data:
            formattedDevices
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
            error.message
        });

    }

};


const getSingleDevice = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        const deviceResult =
            await getDeviceById(
                id
            );

        if (
            deviceResult.rows.length === 0
        ) {

            return res.status(404).json({
                success: false,
                message:
                "Device not found"
            });

        }

        const device =
            deviceResult.rows[0];

        device.created_at =
            formatToPakistanTime(
                device.created_at
            );

        device.last_seen =
            formatToPakistanTime(
                device.last_seen
            );

        return res.status(200).json({
            success: true,
            data:
            device
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
            error.message
        });

    }

};


const syncDeviceStatus = async (
    req,
    res
) => {

    try {

        const {
            device_id,
            battery_level,
            network_type,
            is_online
        } = req.body;

        const updatedDevice =
            await updateDeviceStatus(
                device_id,
                battery_level,
                network_type,
                is_online
            );

        if (
            updatedDevice.rows.length === 0
        ) {

            return res.status(404).json({
                success: false,
                message:
                "Device not found"
            });

        }

        const device =
            updatedDevice.rows[0];

        device.created_at =
            formatToPakistanTime(
                device.created_at
            );

        device.last_seen =
            formatToPakistanTime(
                device.last_seen
            );

        return res.status(200).json({
            success: true,
            message:
            "Device status updated",
            data:
            device
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
    registerDevice,
    getAllDevices,
    getSingleDevice,
    syncDeviceStatus
};