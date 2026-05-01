const pool = require("../config/db");

const createCommand = async (
    owner_id,
    device_id,
    command_type,
    command_message
) => {

    return await pool.query(
        `
        INSERT INTO commands
        (
            owner_id,
            device_id,
            command_type,
            command_message
        )
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [
            owner_id,
            device_id,
            command_type,
            command_message
        ]
    );

};

module.exports = {
    createCommand
};