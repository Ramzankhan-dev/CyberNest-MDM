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

const getDevicesByOwnerId = async (
    owner_id
) => {

    return await pool.query(
        `
        SELECT * FROM devices
        WHERE owner_id=$1
        ORDER BY id DESC
        `,
        [owner_id]
    );

};

const getDeviceById = async (
    deviceId
) => {

    return await pool.query(
        `
        SELECT * FROM devices
        WHERE id=$1
        `,
        [deviceId]
    );

};


const updateDeviceStatus = async (
    device_id,
    battery_level,
    network_type,
    is_online
) => {

    return await pool.query(
        `
        UPDATE devices
        SET
        battery_level=$1,
        network_type=$2,
        is_online=$3,
        last_seen=NOW()
        WHERE device_id=$4
        RETURNING *
        `,
        [
            battery_level,
            network_type,
            is_online,
            device_id
        ]
    );

};

module.exports = {
    createDevice,
    findDeviceById,
    getDevicesByOwnerId,
    getDeviceById,
    updateDeviceStatus
};