const {
    createCommand
} = require(
    "../models/command.model"
);

const {
    getOnlineDeviceById
} = require(
    "../models/device.model"
);


const sendCommand = async (
    req,
    res
) => {

    try {

        // Logged-in owner
        const ownerId =
            req.user.id;

        const {
            device_id,
            command_type,
            command_message
        } = req.body;


        // Check if device is online
        const device =
            await getOnlineDeviceById(
                device_id
            );

        if (
            device.rows.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                "Device is offline"
            });

        }


        // Save command in database
        const result =
            await createCommand(
                ownerId,
                device_id,
                command_type,
                command_message
            );


        // Send success response
        return res.status(201).json({
            success: true,
            message:
            "Command sent successfully",
            data:
            result.rows[0]
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
    sendCommand
};