const pool = require("../config/db");

const createDevice = async (
    owner_id,
    device_name,
    device_id,
    android_version,
    battery_level,
    network_type
) => {

    return await pool.query(
        `
        INSERT INTO devices
        (
            owner_id,
            device_name,
            device_id,
            android_version,
            battery_level,
            network_type
        )
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            owner_id,
            device_name,
            device_id,
            android_version,
            battery_level,
            network_type
        ]
    );

};

const findDeviceById = async (
    device_id
) => {

    return await pool.query(
        `
        SELECT * FROM devices
        WHERE device_id=$1
        `,
        [device_id]
    );

};

module.exports = {
    createDevice,
     findDeviceById
};