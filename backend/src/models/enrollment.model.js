const pool = require("../config/db");

const createEnrollmentCode = async (
    owner_id,
    code
) => {

    return await pool.query(
        `
        INSERT INTO enrollment_codes
        (
            owner_id,
            code
        )
        VALUES($1,$2)
        RETURNING *
        `,
        [
            owner_id,
            code
        ]
    );

};

const findEnrollmentCode = async (
    code
) => {

    return await pool.query(
        `
        SELECT * FROM enrollment_codes
        WHERE code=$1
        AND is_used=false
        `,
        [code]
    );

};

const markCodeUsed = async (
    code
) => {

    return await pool.query(
        `
        UPDATE enrollment_codes
        SET is_used=true
        WHERE code=$1
        `,
        [code]
    );

};

module.exports = {
    createEnrollmentCode,
    findEnrollmentCode,
    markCodeUsed
};